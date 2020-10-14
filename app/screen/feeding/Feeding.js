import React from "react";
import { StyleSheet } from "react-native";
import Feedings from "../../components/Feeding/Feedings";

const Feeding = ({ user }) => {
  return <Feedings user={user} />;
};

export default Feeding;

const styles = StyleSheet.create({});
