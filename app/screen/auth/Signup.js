import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";

import { validateEmail, validateEmptyForm } from "../../utils/validations";
import { register } from "../../services/auth/register.service";

const Signup = ({ setLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const submit = () => {
    if (
      validateEmptyForm(formData.name) ||
      validateEmptyForm(formData.email) ||
      validateEmptyForm(formData.password) ||
      validateEmptyForm(formData.confirmPassword)
    ) {
      setError("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      setError("El email no es correcto");
    } else if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas tienen que ser iguales");
    } else if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
    } else {
      setIsLoading(true);
      setError("");
      delete formData["confirmPassword"];
      //request here
      register(formData)
        .then((response) => {
          if (!response) {
            setIsLoading(false);
            console.log(response);
            setError("El correo ya existe");
            setFormData(defaultFormValue());
          } else {
            setLogin(true);
            setFormData(defaultFormValue());
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setFormData(defaultFormValue());
          setError("Error en el sistema");
        });
    }
  };
  return (
    <View style={styles.signUpContainer}>
      <View>
        <Text style={styles.registerTextHeader}>Registrate</Text>
      </View>
      <View style={styles.inputGroup}>
        <Input
          containerStyle={styles.inputStyleContainer}
          inputStyle={styles.inputStyle}
          label="Nombre del bebé"
          rightIconContainerStyle={styles.rightIcon}
          rightIcon={() => <Icon type="material-community" name="account" />}
          onChange={(e) =>
            setFormData({ ...formData, name: e.nativeEvent.text })
          }
          value={formData.name}
        />
        <Input
          containerStyle={styles.inputStyleContainer}
          inputStyle={styles.inputStyle}
          label="Correo"
          rightIconContainerStyle={styles.rightIcon}
          rightIcon={() => <Icon type="material-community" name="email" />}
          onChange={(e) =>
            setFormData({ ...formData, email: e.nativeEvent.text })
          }
          value={formData.email}
        />
        <Input
          containerStyle={styles.inputStyleContainer}
          inputStyle={styles.inputStyle}
          password={true}
          secureTextEntry={showPassword ? false : true}
          label="Contraseña"
          rightIconContainerStyle={styles.rightIcon}
          rightIcon={{
            type: "material-community",
            name: showPassword ? "eye-off-outline" : "eye-outline",
            opacity: 0.5,
            onPress: () => setShowPassword(!showPassword),
          }}
          onChange={(e) =>
            setFormData({ ...formData, password: e.nativeEvent.text })
          }
          value={formData.password}
        />
        <Input
          containerStyle={styles.inputStyleContainer}
          inputStyle={styles.inputStyle}
          password={true}
          secureTextEntry={showRepeatPassword ? false : true}
          label="Confirmar Contraseña"
          rightIconContainerStyle={styles.rightIcon}
          rightIcon={{
            type: "material-community",
            name: showRepeatPassword ? "eye-off-outline" : "eye-outline",
            opacity: 0.5,
            onPress: () => setShowRepeatPassword(!showRepeatPassword),
          }}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.nativeEvent.text })
          }
          value={formData.confirmPassword}
          errorMessage={error}
          errorStyle={styles.errorStyle}
        />
      </View>
      <View style={styles.buttonContainerStyle}>
        <Button style title="Registrar" onPress={submit} loading={isLoading} />
      </View>
    </View>
  );
};

function defaultFormValue() {
  return {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
}

export default Signup;

const styles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#A0C4FF",
  },
  registerTextHeader: {
    color: "#FFFFFF",
    fontSize: 35,
    marginTop: "15%",
  },
  inputGroup: {
    width: "90%",
  },
  inputStyleContainer: {
    marginBottom: "3%",
  },
  buttonContainerStyle: {
    width: "90%",
  },
  inputStyle: {
    opacity: 0.9,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  rightIcon: {
    opacity: 0.3,
  },
  errorStyle: {
    marginTop: "3%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "#F7FF0A",
  },
});
