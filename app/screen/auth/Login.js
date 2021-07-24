import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
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
      <Image 
          resizeMode='center'
          style={{ width: Dimensions.get("window").width * 0.5, height: Dimensions.get("window").height * 0.25, alignSelf: "center", marginTop: 15}}
          source={require('../../../assets/logoWithe.png')} 
      />
      <View>
        <Text style={styles.welcomeText}>Bienvenido</Text>
      </View>
      <View style={styles.inputButtonContainer}>
        <Input
          containerStyle={styles.input}
          inputStyle={styles.inputStyle}
          label="Correo"
          labelStyle={{ color: 'white'}}
          rightIconContainerStyle={styles.rightIcon}
          rightIcon={{
            type: 'material-community',
            name: 'email',
            color: 'white'
          }}
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
          labelStyle={{ color: 'white'}}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(43, 95, 159, 1)",
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 30,
    marginTop: "20%",
  },
  inputButtonContainer: {
    width: "90%",
    alignItems: "center",
  },
  input: {
    marginTop: "7%",
    width: "75%"
  },
  button: {
    width: "75%",
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
    opacity: 0.5,
  },
  errorStyle: {
    marginTop: "3%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "#F7FF0A",
  },
});
