import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";

const ChangeAlias = () => {
  return (
    <View>
      <Input label="Alias" placeholder="Introduzca el nuevo alias" />
      <Input label="Contraseña" placeholder="Introduzca su contraseña" />
      <Button title="Actualizar Alias" />
    </View>
  );
};

export default ChangeAlias;

const styles = StyleSheet.create({
  aliasContainer: {},
});
