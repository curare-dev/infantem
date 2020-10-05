import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ListItem, Overlay, Icon } from "react-native-elements";
import { getColor } from "../../utils/colors";
import PediatricianPage from "./PediatricianPage";
import { getPlaces, getUserLocation } from "../../services/maps/map";
import Loading from "../../shared/Loading";

const FindPediatrician = () => {
  const [reloadPage, setReloadPage] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sendData, setSendData] = useState({});
  const [pediatricians, setPediatricians] = useState({});
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  useEffect(() => {
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
    <ScrollView style={styles.findPediatricianContainer}>
      {!reloadPage ? (
        <Loading text="Cargando" />
      ) : (
        pediatricians.results.map((u, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={async () => {
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
});
