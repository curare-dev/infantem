import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ListItem, Overlay, Icon } from "react-native-elements";
import { getColor } from "../../utils/colors";
import { createUUID } from "../../utils/uuid";
import PediatricianPage from "./PediatricianPage";

const pediatras = [
  {
    uuid: createUUID(),
    name: "Juanin Juan Harry",
    ubicacion: "La cúspide, Zapopan, Jalisco, Mexico",
    type: "medico",
  },
  {
    uuid: createUUID(),
    name: "Hospital Infantil",
    ubicacion: "Avenida Siempreviva 742, Springfield, Oregón, EE.UU",
    type: "hospital",
  },
  {
    uuid: createUUID(),
    name: "Unidad Pediatrica Infantil",
    ubicacion: "Lejos de aquí",
    type: "consultorio",
  },
  {
    uuid: createUUID(),
    name: "Dr. Mario",
    ubicacion: "En los jueguitos",
    type: "medico",
  },
  {
    uuid: createUUID(),
    name: "Consultorio Pediatrico de Tesisyork",
    ubicacion: "Tesisyork, Zapopan, Jalisco",
    type: "consultorio",
  },
  {
    uuid: createUUID(),
    name: "Dr. Victor Von Doom",
    ubicacion: "Chingando a los cuatro fantasticos",
    type: "medico",
  },
  {
    uuid: createUUID(),
    name: "Hospital del ñiño",
    ubicacion: "Pais de nunca jamás",
    type: "hospital",
  },
  {
    uuid: createUUID(),
    name: "Dr. Otto Octavius",
    ubicacion: "En su lab",
    type: "medico",
  },
  {
    uuid: createUUID(),
    name: "Dr. Strange",
    ubicacion: "Jugando con su magia",
    type: "medico",
  },
];
const FindPediatrician = () => {
  const [visible, setVisible] = useState(false);
  const [sendData, setSendData] = useState({});
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const getIcon = (type) => {
    switch (type) {
      case "medico":
        return (
          <Icon type="material-community" name="account-tie" opacity={0.6} />
        );
      case "hospital":
        return (
          <Icon
            type="material-community"
            name="hospital-building"
            opacity={0.6}
          />
        );
      case "consultorio":
        return (
          <Icon type="material-community" name="home-city" opacity={0.6} />
        );
      default:
        return <Icon type="material-community" name="account" opacity={0.6} />;
    }
  };
  return (
    <ScrollView style={styles.findPediatricianContainer}>
      {pediatras.map((u, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              toggleOverlay();
              setSendData({
                uuid: u.uuid,
                name: u.name,
                ubicacion: u.ubicacion,
              });
            }}
          >
            <ListItem containerStyle={styles.listContainerStyle}>
              {getIcon(u.type)}
              <ListItem.Content>
                <ListItem.Title>{u.name}</ListItem.Title>
                <ListItem.Subtitle>{u.ubicacion}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        );
      })}
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
