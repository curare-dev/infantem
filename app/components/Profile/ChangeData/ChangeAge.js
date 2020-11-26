import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, ButtonGroup, Input } from "react-native-elements";
import { updateUserById } from "../../../services/profile/user.service";
import { getColor } from "../../../utils/colors";
import { validateEmptyForm } from "../../../utils/validations";
import {
  AdMobInterstitial,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

const ChangeAge = ({ setIsVisible, setReloadProfileInfo }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const showAd = async () => {
    await setTestDeviceIDAsync('EMULATOR');
    await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false});
    await AdMobInterstitial.showAdAsync();
  }

  const updateAge = (timeUnit) => {
    if (validateEmptyForm(formData.age)) {
      setError("Todos los campos son obligatorios");
    } else {
      if(timeUnit === 0){
        formData.age > 1 ? formData.timeUnit = "Años" : formData.timeUnit = "Año";
      } else {
        formData.age > 1 ? formData.timeUnit = "Meses" : formData.timeUnit = "Mes";
      }
      updateUserById({ age: formData.age + " " + formData.timeUnit })
        .then((response) => {
          showAd();
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
        keyboardType="numeric"
        onChange={(e) => setFormData({ age: e.nativeEvent.text })}
        errorStyle={styles.errorStyle}
        errorMessage={error}
        containerStyle={{width: "75%", alignSelf: "center"}}
      />
      <ButtonGroup 
        onPress={(e)=>{
          console.log("Boton apretado", e);
          updateAge(e);
        }}
        buttons={[
          'Años',
          'Meses'
        ]}
        containerStyle={styles.buttonContainer} 
        buttonStyle={styles.buttonStyle}
        textStyle={{color: "white"}}
      />
    </View>
  );
};

export default ChangeAge;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    width: "90%",
    color: "white"
  },
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
  },
});
