import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <Header
      placement="left"
      leftComponent={{ icon: "menu", color: "#fff" }}
      centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
      rightComponent={{ icon: "home", color: "#fff" }}
    />
  );
};

export default Header;

const styles = StyleSheet.create({});
