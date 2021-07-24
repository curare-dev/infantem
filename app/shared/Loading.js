import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";
import { getColor } from "../utils/colors";

export default function Loading(props) {
  const { isVisible, text } = props;
  const dismissBackdrop = () => !isVisible;
  return (
    <Overlay isVisible={isVisible} backdropStyle={styles.backdrop} overlayStyle={styles.overlay}>
      <View style={styles.view}>
        <ActivityIndicator size="large" color={getColor("backgroundColor")} />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "15%",
    width: "60%",
    backgroundColor: getColor("headerBackgroundColor"),
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: getColor("backgroundColor"),
    textTransform: "uppercase",
    marginTop: 10,
  },
  backdrop: {
    opacity: 0
  }
});
