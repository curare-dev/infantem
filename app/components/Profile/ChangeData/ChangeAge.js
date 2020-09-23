import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { updateUserById } from "../../../services/profile/user.service";

const ChangeAge = ({ setIsVisible, setReloadInfo }) => {
  const [formData, setFormData] = useState({});

  const updateAge = () => {
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
        label="Edad"
        placeholder="Introduzca la edad"
        onChange={(e) => setFormData({ age: e.nativeEvent.text })}
      />
      <Button title="Actualizar Edad" onPress={updateAge} />
    </View>
  );
};

export default ChangeAge;

const styles = StyleSheet.create({});
