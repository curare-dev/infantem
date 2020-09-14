import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SocialIcon } from "react-native-elements";

const ShareApp = () => {
  return (
    <View style={styles.shareAppContainer}>
      <Text style={styles.title}>Comparte nuestra aplicación</Text>
      <View style={styles.socialContainer}>
        <SocialIcon type="facebook" />
        <SocialIcon type="instagram" />
        <SocialIcon
          type="whatsapp"
          raised={false}
          style={styles.whatsappIcon}
        />
      </View>
      <View style={styles.socialContainer}>
        <SocialIcon type="twitter" />
        <SocialIcon type="google" />
        <SocialIcon type="youtube" />
      </View>
    </View>
  );
};

export default ShareApp;

const styles = StyleSheet.create({
  shareAppContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  socialContainer: {
    flexDirection: "row",
  },
  whatsappIcon: {
    backgroundColor: "#25D366",
  },
  title: {
    fontWeight: "bold",
    opacity: 0.5,
    padding: "5%",
  },
});
