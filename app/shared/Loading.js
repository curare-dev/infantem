import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";
import { getColor } from "../utils/colors";

export default function Loading(props) {
  const { isVisible, text } = props;

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="transparent"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color={getColor("backgroundColor")} />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: 200,
    width: 200,
    backgroundColor: "transparent",
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
});
