import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { ListItem, Overlay, Icon } from "react-native-elements";
import { getColor } from "../../utils/colors";
import PediatricianPage from "./PediatricianPage";
import { getPlaces, getUserLocation } from "../../services/maps/map";
import Loading from "../../shared/Loading";
import {
  AdMobBanner,
  AdMobInterstitial,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

const FindPediatrician = () => {
  const [reloadPage, setReloadPage] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sendData, setSendData] = useState({});
  const [pediatricians, setPediatricians] = useState({});
  const [countAd, setCountAd] = useState(0);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const showAd = async () => {
    await setTestDeviceIDAsync('EMULATOR');
    await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false});
    await AdMobInterstitial.showAdAsync();
    setCountAd(0);
  }

  useEffect(() => {
    console.log("Entra aquí");
    async function fetchUserLocation() {
      let userLocation = await getUserLocation();
      
      await getPlaces(
        userLocation.coords.latitude,
        userLocation.coords.longitude
      )
        .then(async (response) => {
          await setPediatricians(response);
          await setReloadPage(true);
        })
        .catch((error) => console.error(error));
    }
    fetchUserLocation();
  }, [reloadPage]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.findPediatricianContainer}>
      {!reloadPage ? (
        <Loading text="Cargando" />
      ) : (
        pediatricians.results.map((u, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={async () => {
                setCountAd(countAd + 1);
                if(countAd === 2){
                  showAd();
                }
                await setSendData({
                  uuid: u.place_id,
                  name: u.name,
                  ubicacion: u.vicinity,
                  coordinates: u.geometry.location,
                });
                toggleOverlay();
              }}
            >
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
      )}
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayContainer}
      >
        <PediatricianPage pediatrician={sendData} />
      </Overlay>
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
  findPediatricianContainer: {
    margin: "5%",
  },
  listContainerStyle: {
    backgroundColor: getColor("cardColor"),
    margin: "1%",
    borderRadius: 5,
  },
  overlayContainer: {
    padding: "10%",
    backgroundColor: getColor("cardColor"),
  },
  container: {
    flex: 1
  }
});
