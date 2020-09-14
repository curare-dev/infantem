import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";

const ChangePassword = () => {
  return (
    <View>
      <Input label="Contraseña" placeholder="Introduzca su contraseña" />
      <Input
        label="Contraseña Nueva"
        placeholder="Introduzca nueva contraseña"
      />
      <Input
        label="Confirmar Contraseña"
        placeholder="Introduzca nueva contraseña"
      />
      <Button title="Actualizar Contraseña" />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
