import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { updatePassword } from "../../../services/profile/user.service";
import { getColor } from "../../../utils/colors";
import { validateEmptyForm } from "../../../utils/validations";
import {
  AdMobInterstitial,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

const ChangePassword = ({ setIsVisible, setReloadProfileInfo }) => {
  const [formData, setFormData] = useState(defaultFormValue());
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const showAd = async () => {
    await setTestDeviceIDAsync('EMULATOR');
    await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false});
    await AdMobInterstitial.showAdAsync();
  }

  const changePassword = () => {
    if (
      validateEmptyForm(formData.password) ||
      validateEmptyForm(formData.newPassword) ||
      validateEmptyForm(formData.confirmNewPassword)
    ) {
      setFormData(defaultFormValue());
      setError("Todos los campos son obligatorios");
    } else if (setFormData.newPassword !== setFormData.confirmNewPassword) {
      setFormData(defaultFormValue());
      setError("Las contraseñas deben coincidir");
    } else {
      delete formData["confirmNewPassword"];
      updatePassword(formData)
        .then((response) => {
          if (!response) {
            setFormData(defaultFormValue());
            setError("Contraseña incorrecta");
          } else {
            showAd();
            setReloadProfileInfo(true);
            setIsVisible(false);
          }
        })
        .catch((error) => {
          setFormData(defaultFormValue());
          setError("Contraseña incorrecta");
        });
    }
  };
  return (
    <View>
      <Input
        label="Contraseña"
        password={true}
        secureTextEntry={showPassword ? false : true}
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
        label="Contraseña Nueva"
        password={true}
        secureTextEntry={showNewPassword ? false : true}
        rightIconContainerStyle={styles.rightIcon}
        rightIcon={{
          type: "material-community",
          name: showNewPassword ? "eye-off-outline" : "eye-outline",
          opacity: 0.5,
          onPress: () => setShowNewPassword(!showNewPassword),
        }}
        onChange={(e) =>
          setFormData({ ...formData, newPassword: e.nativeEvent.text })
        }
        value={formData.newPassword}
      />
      <Input
        label="Confirmar Contraseña"
        password={true}
        secureTextEntry={showConfirmNewPassword ? false : true}
        rightIconContainerStyle={styles.rightIcon}
        rightIcon={{
          type: "material-community",
          name: showConfirmNewPassword ? "eye-off-outline" : "eye-outline",
          opacity: 0.5,
          onPress: () => setShowConfirmNewPassword(!showConfirmNewPassword),
        }}
        onChange={(e) =>
          setFormData({ ...formData, confirmNewPassword: e.nativeEvent.text })
        }
        errorStyle={styles.errorStyle}
        errorMessage={error}
        value={formData.confirmNewPassword}
      />
      <Button       
      containerStyle={styles.buttonContainer}
      buttonStyle={styles.buttonStyle}  
      title="Actualizar Contraseña" 
      onPress={changePassword} />
    </View>
  );
};

function defaultFormValue() {
  return {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };
}

export default ChangePassword;

const styles = StyleSheet.create({
  errorStyle: {
    marginTop: "5%",
    marginBottom: "5%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "red",
  },
  rightIcon: {
    opacity: 0.3,
  },
  buttonContainer: {
    alignSelf: "center",
    width: "90%",
  },
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
  },
});
