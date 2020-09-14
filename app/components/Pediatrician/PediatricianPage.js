import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { getColor } from "../../utils/colors";
import { Text, Button, Divider, Overlay } from "react-native-elements";
import Appointment from "./Appointment";

const PediatricianPage = (props) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const {
    pediatrician: { uuid, name, ubicacion },
  } = props;
  return (
    <View>
      <Text style={styles.title}>{name}</Text>
      <Divider style={styles.divider} />
      <Text style={styles.subtitle}>Ubicación: {ubicacion}</Text>
      <Image
        source={{
          uri:
            "https://de10.com.mx/sites/default/files/2020/02/14/google_maps_nuevas_funciones.jpg",
        }}
        resizeMode="contain"
        style={styles.image}
      />
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
});
