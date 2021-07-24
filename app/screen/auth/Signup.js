import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
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
        <Image 
          resizeMode="center"
          style={{ width: Dimensions.get("window").width * 0.50, height: Dimensions.get("window").height * 0.25, alignSelf: "center", marginTop: 15}}
          source={require('../../../assets/logoWithe.png')} 
        />
        <Text style={styles.registerTextHeader}>Registrate</Text>
      </View>
      <View style={styles.inputGroup}>
        <Input
          containerStyle={styles.inputStyleContainer}
          inputStyle={styles.inputStyle}
          label="Nombre del bebé"
          labelStyle={styles.label}
          rightIconContainerStyle={styles.rightIcon}
          rightIcon={{
            type: "material-community",
            name: "account",
            onPress: () => setShowPassword(!showPassword),
            color: 'white'
          }}
          onChange={(e) =>
            setFormData({ ...formData, name: e.nativeEvent.text })
          }
          value={formData.name}
        />
        <Input
          containerStyle={styles.inputStyleContainer}
          inputStyle={styles.inputStyle}
          label="Correo"
          labelStyle={styles.label}
          rightIconContainerStyle={styles.rightIcon}
          rightIcon={{
            type: "material-community",
            name: "email",
            onPress: () => setShowPassword(!showPassword),
            color: 'white'
          }}
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
          labelStyle={styles.label}
          rightIconContainerStyle={styles.rightIcon}
          rightIcon={{
            type: "material-community",
            name: showPassword ? "eye-off-outline" : "eye-outline",
            onPress: () => setShowPassword(!showPassword),
            color: 'white'
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
          labelStyle={styles.label}
          rightIconContainerStyle={styles.rightIcon}
          rightIcon={{
            type: "material-community",
            name: showRepeatPassword ? "eye-off-outline" : "eye-outline",
            onPress: () => setShowRepeatPassword(!showRepeatPassword),
            color: 'white'
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(43, 95, 159, 1)",
  },
  registerTextHeader: {
    color: "#FFFFFF",
    fontSize: 30,
    marginTop: "10%",
    marginBottom: "10%"
  },
  inputGroup: {
    width: "90%",
  },
  inputStyleContainer: {
    alignSelf: "center",
    width: "75%",
    marginTop: -20
  },
  buttonContainerStyle: {
    width: "70%",
  },
  inputStyle: {
    opacity: 0.9,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  rightIcon: {
    opacity: 0.5,
  },
  errorStyle: {
    marginTop: "3%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "#F7FF0A",
  },
  label: {
    color: 'white'
  }
});
