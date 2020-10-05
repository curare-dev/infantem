import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { closeSession } from "../../utils/closeSession";
import { getColor } from "../../utils/colors";

const LogOut = ({ setLogin }) => {
  const endSession = () => {
    closeSession();
    setLogin(true);
  };
  return (
    <View>
      <Text style={styles.textSession}>¿Desea cerrar sesión?</Text>
      <Button
        buttonStyle={styles.sessionButton}
        title="Si"
        onPress={endSession}
      />
    </View>
  );
};

export default LogOut;

const styles = StyleSheet.create({
  textSession: {
    margin: "5%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  sessionButton: {
    backgroundColor: getColor("buttonColor"),
  },
});
