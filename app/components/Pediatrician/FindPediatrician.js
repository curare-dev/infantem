import React, { useEffect, useState } from "react";
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

  const userLocation = async () => {
    // setIsLoading(true);
    await getUserLocation().then( response => {
      getPlaces(response.coords.latitude, response.coords.longitude).then( response => {
        setIsLoading(false);
        setList(
          response.results.map((u, i) => {
            return (
              <TouchableOpacity key={i} onPress={ async () => {
                await setRenderComponent(
                  <PediatricianPage pediatrician={{
                    uuid: u.place_id,
                    name: u.name,
                    ubicacion: u.vicinity,
                    coordinates: u.geometry.location,
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
        console.log("Error al traer a los pediatras: ", error);
      });
    }).catch( error => {
      console.log("userLocation error: ", error);
    } );
  }

  useEffect(() => {
    userLocation();
  }, [reload])

  return (
    isLoading ? <Loading text="Cargando Lista de Pediatras"/> :    
    <View style={{flex: 1}}>
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
