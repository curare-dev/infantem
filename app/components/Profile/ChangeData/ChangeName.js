import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { updateUserById } from "../../../services/profile/user.service";
import { getColor } from "../../../utils/colors";

const ChangeName = ({ setIsVisible, setReloadProfileInfo }) => {
  const [formData, setFormData] = useState({});

  const updateName = () => {
    updateUserById(formData)
      .then((response) => {
        setReloadProfileInfo(true);
        setIsVisible(false);
      })
      .catch((error) => console.error(error));
  };
  return (
    <View>
      <Input
        label="Nombre"
        placeholder="Introduzca el nombre"
        onChange={(e) => setFormData({ name: e.nativeEvent.text })}
      />
      <Button         
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle} 
        title="Actualizar nombre" 
        onPress={updateName} />
    </View>
  );
};

export default ChangeName;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    width: "90%",
  },
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
  },
});
