import React, { useState } from "react";
import { StyleSheet, View, Linking } from "react-native";
import { getColor } from "../../utils/colors";
import { Text, Button, Divider, Overlay } from "react-native-elements";
import Appointment from "./Appointment";
import MapView, { Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";

const PediatricianPage = ({ pediatrician }) => {
  let { uuid, name, ubicacion, coordinates } = pediatrician;
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const redirectGoogleMaps = (name) => {
    const URL = `https://www.google.com/maps/search/?api=1&query=${name}`;
    const supported = Linking.canOpenURL(URL);
    if (supported) {
      Linking.openURL(URL);
    } else {
      console.log("No se pudo abrir el link");
    }
  };

  return (
    <View>
      <Text style={styles.title}>{name}</Text>
      <Divider style={styles.divider} />
      <Text style={styles.subtitle}>Ubicación: {ubicacion}</Text>
      <MapView
        customMapStyle={styles.customMapStyle}
        initialRegion={{
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        style={styles.mapStyle}
        onPress={(e) => {
          e.stopPropagation();
          redirectGoogleMaps(name);
        }}
      >
        <Marker
          coordinate={{
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            title: "Foo Place",
            subtitle: "1234 Foo Drive",
          }}
        ></Marker>
      </MapView>
      <Button
        title="Pide una consulta Aquí"
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.buttonContainer}
        onPress={toggleOverlay}
      />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayContainer}
      >
        <Appointment setVisible={setVisible} />
      </Overlay>
    </View>
  );
};

export default PediatricianPage;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
  },
  image: {
    height: 200,
    width: "100%",
  },
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
    width: "90%",
  },
  buttonContainer: {
    alignItems: "center",
  },
  divider: {
    marginTop: "5%",
    marginBottom: "5%",
  },
  overlayContainer: {
    width: "75%",
  },
  mapStyle: {
    alignSelf: "center",
    width: 250,
    height: 250,
    margin: "5%",
  },
});
