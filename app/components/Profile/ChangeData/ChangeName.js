import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";

const ChangeName = () => {
  return (
    <View>
      <Input label="Nombre" placeholder="Introduzca el nombre" />
      <Input label="Contraseña" placeholder="Introduzca su contraseña" />
      <Button title="Actualizar nombre" />
    </View>
  );
};

export default ChangeName;

const styles = StyleSheet.create({});
