import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { loginService } from "../../services/auth/login.service";
import { validateEmail, validateEmptyForm } from "../../utils/validations";

const Login = ({ setLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const login = () => {
    if (
      validateEmptyForm(formData.email) ||
      validateEmptyForm(formData.password)
    ) {
      setError("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      setError("El email no es correcto");
    } else {
      setIsLoading(true);
      loginService(formData)
        .then((response) => {
          if (response === 2 || response === 1) {
            setError("Usuario o Contraseña Incorrecta");
            setIsLoading(false);
          } else {
            setLogin(true);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setError("Error en el servidor");
          console.error(error);
        });
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View>
        <Text style={styles.welcomeText}>Bienvenido!</Text>
      </View>
      <View style={styles.inputButtonContainer}>
        <Input
          containerStyle={styles.input}
          inputStyle={styles.inputStyle}
          label="Correo"
          rightIconContainerStyle={styles.rightIcon}
          rightIcon={() => <Icon type="material-community" name="email" />}
          onChange={(e) =>
            setFormData({ ...formData, email: e.nativeEvent.text })
          }
        />
        <Input
          containerStyle={styles.input}
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
          errorStyle={styles.errorStyle}
          errorMessage={error}
        />
      </View>
      <View style={styles.inputButtonContainer}>
        <Button
          containerStyle={styles.button}
          style={styles.buttonStyle}
          title="Entrar"
          onPress={login}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#A0C4FF",
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 35,
  },
  inputButtonContainer: {
    width: "90%",
    alignItems: "center",
  },
  input: {
    marginTop: "10%",
  },
  button: {
    width: "90%",
  },
  touchableStyle: {
    padding: "3%",
    marginTop: "3%",
  },
  inputStyle: {
    opacity: 0.9,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtext: {
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
