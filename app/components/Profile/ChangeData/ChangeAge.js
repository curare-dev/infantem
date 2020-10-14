import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { updateUserById } from "../../../services/profile/user.service";
import { getColor } from "../../../utils/colors";
import { validateEmptyForm } from "../../../utils/validations";

const ChangeAge = ({ setIsVisible, setReloadProfileInfo }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const updateAge = () => {
    if (validateEmptyForm(formData.age)) {
      setError("Todos los campos son obligatorios");
    } else {
      updateUserById(formData)
        .then((response) => {
          setReloadProfileInfo(true);
          setIsVisible(false);
          setError("");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <View>
      <Input
        label="Edad"
        placeholder="Introduzca la edad"
        onChange={(e) => setFormData({ age: e.nativeEvent.text })}
        errorStyle={styles.errorStyle}
        errorMessage={error}
      />
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        title="Actualizar Edad"
        onPress={updateAge}
      />
    </View>
  );
};

export default ChangeAge;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    width: "90%",
  },
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
  },
});
