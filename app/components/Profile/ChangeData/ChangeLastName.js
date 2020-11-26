import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { updateUserById } from "../../../services/profile/user.service";
import { getColor } from "../../../utils/colors";
import {
  AdMobInterstitial,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

const ChangeLastName = ({ setIsVisible, setReloadProfileInfo }) => {
  const [formData, setFormData] = useState({});

  const showAd = async () => {
    await setTestDeviceIDAsync('EMULATOR');
    await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false});
    await AdMobInterstitial.showAdAsync();
  }

  const updateLastname = () => {
    updateUserById(formData)
      .then((response) => {
        showAd();
        setReloadProfileInfo(true);
        setIsVisible(false);
      })
      .catch((error) => console.error(error));
  };
  return (
    <View>
      <Input
        label="Apellidos"
        placeholder="Introduzca los apellidos"
        onChange={(e) => setFormData({ lastname: e.nativeEvent.text })}
      />
      <Button 
      containerStyle={styles.buttonContainer}
      buttonStyle={styles.buttonStyle} 
      title="Actualizar Apellidos" 
      onPress={updateLastname} />
    </View>
  );
};

export default ChangeLastName;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    width: "90%",
  },
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
  },
});
