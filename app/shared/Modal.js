import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Overlay } from "react-native-elements";
import { getColor } from "../utils/colors";

const Modal = (props) => {
  const { isVisible, setIsVisible, children } = props;
  const closeModal = () => setIsVisible(false);
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={closeModal}
      overlayStyle={styles.overlayContainer}
    >
      {children}
    </Overlay>
  );
};

export default Modal;

const styles = StyleSheet.create({
  overlayContainer: {
    padding: "5%",
    backgroundColor: getColor("cardColor"),
    width: "75%",
  },
});
