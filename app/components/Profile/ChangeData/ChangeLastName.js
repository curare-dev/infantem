import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";

const ChangeLastName = () => {
  return (
    <View>
      <Input label="Apellidos" placeholder="Introduzca los apellidos" />
      <Input label="Contraseña" placeholder="Introduzca su contraseña" />
      <Button title="Actualizar Apellidos" />
    </View>
  );
};

export default ChangeLastName;

const styles = StyleSheet.create({});
