import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { updateUserById } from "../../../services/profile/user.service";

const ChangeLastName = ({ setIsVisible, setReloadInfo }) => {
  const [formData, setFormData] = useState({});

  const updateLastname = () => {
    updateUserById(formData)
      .then((response) => {
        setReloadInfo(true);
        setIsVisible(false);
      })
      .catch((error) => console.error(error));
  };
  return (
    <View>
      <Input
        label="Apellidos"
        placeholder="Introduzca los apellidos"
        onChange={(e) => setFormData({ lastname: e.nativeEvent.text })}
      />
      <Button title="Actualizar Apellidos" onPress={updateLastname} />
    </View>
  );
};

export default ChangeLastName;

const styles = StyleSheet.create({});
