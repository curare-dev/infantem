import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View, Text } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { getPlaces, getUserLocation } from "../../services/maps/map";
import Modal from "../../shared/Modal";
import PediatricianPage from "./PediatricianPage";
import {
  AdMobBanner,
  AdMobInterstitial,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

const FindPediatrician = () => {
  const [reload, setReload] = useState(false);
  const [list, setList] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [countAd, setCountAd] = useState(0);

  const showAd = async () => {
    await setTestDeviceIDAsync('EMULATOR');
    await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false});
    await AdMobInterstitial.showAdAsync();
    setCountAd(0);
  }

  const userLocation = async () => {
    await getUserLocation().then( response => {
      getPlaces(response.coords.latitude, response.coords.longitude).then( response => {
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
    <View style={{flex: 1}}>
      <ScrollView>
        {list}
        <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
          {renderComponent}
        </Modal>
      </ScrollView>
      <AdMobBanner
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={"No se encontró anuncio"} 
          style={styles.ad}
      />
    </View>

    
  );
};

export default FindPediatrician;

const styles = StyleSheet.create({
  listContainerStyle: {
    margin: "0.5%",
  },
});
