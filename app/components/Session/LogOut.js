import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { closeSession } from "../../utils/closeSession";

const LogOut = ({ setLogin }) => {
  const endSession = () => {
    closeSession();
    setLogin(true);
  };
  return (
    <View>
      <Text>¿Desea cerrar sesión?</Text>
      <Button title="Si" onPress={endSession} />
    </View>
  );
};

export default LogOut;

const styles = StyleSheet.create({});
