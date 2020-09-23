import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { updateUserById } from "../../../services/profile/user.service";

const ChangeAlias = ({ setIsVisible, setReloadInfo }) => {
  const [formData, setFormData] = useState({});

  const updateAlias = () => {
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
        label="Alias"
        placeholder="Introduzca el nuevo alias"
        onChange={(e) => setFormData({ username: e.nativeEvent.text })}
      />
      <Button title="Actualizar Alias" onPress={updateAlias} />
    </View>
  );
};

export default ChangeAlias;

const styles = StyleSheet.create({
  aliasContainer: {},
});
