import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { getPlaces, getUserLocation } from "../../services/maps/map";
import Ads, { showAd } from "../../shared/Ads";
import Loading from "../../shared/Loading";
import Modal from "../../shared/Modal";
import PediatricianPage from "./PediatricianPage";

const FindPediatrician = () => {
  const [reload, setReload] = useState(false);
  const [list, setList] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [countAd, setCountAd] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const userLocation = async () => {
    await getUserLocation().then( ({ coords }) => {
      setIsLoading(true);
      setError(null);
      getPlaces(coords.latitude, coords.longitude).then( (response) => {
        setIsLoading(false);
        setList(
          response.map((u, i) => {
            return (
              <TouchableOpacity key={i} onPress={ async () => {
                await setRenderComponent(
                  <PediatricianPage pediatrician={{
                    uuid: u.place_id,
                    name: u.name,
                    ubicacion: u.vicinity,
                    coordinates: u.location,
                  }} />
                );
                setCountAd(countAd + 1);
                if (countAd === 2) {
                  showAd();
                }
                setIsVisible(true);
              }}>
                <ListItem containerStyle={styles.listContainerStyle}>
                  <Icon
                    type="material-community"
                    name="hospital-building"
                    opacity={0.6}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{u.name}</ListItem.Title>
                    <ListItem.Subtitle>{u.vicinity}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </TouchableOpacity>
            );
          })
        );
      }).catch( error => {
        setIsLoading(false);
        setError('Error al obtener pediatras');
        console.log("Error al traer a los pediatras: ", error);
      });
    }).catch( error => {
      setIsLoading(false);
      setError('Error al obtener ubicación');
      console.log("userLocation error: ", error);
    } );
  }

  useEffect(() => {
    userLocation();
  }, [reload])

  return (
    isLoading ? <Loading text="Cargando Lista de Pediatras"/> :    
    <View style={{flex: 1}}>
      { error && (<View style={{ flex: 1}}><Text style={{ position:'absolute', top: '50%', textAlign: 'center', fontSize: Dimensions.get('window').width * 0.09 }}>{error}</Text></View>)}
      <ScrollView>
        {list}
        <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
          {renderComponent}
        </Modal>
      </ScrollView>
      <Ads />
    </View>
  );
};

export default FindPediatrician;

const styles = StyleSheet.create({
  listContainerStyle: {
    margin: "0.5%",
  },
});
