import React, { useState } from "react";
import { StyleSheet, Text, Image, Button, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Pediatrician from "../../screen/pediatrician/Pediatrician";
import { getColor } from "../../utils/colors";

const Stack = createStackNavigator();

const PediatricianStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="pediatrician"
        component={() => <Pediatrician />}
        options={{
          headerRight: () => (
            <Image 
            style={styles.iconStyle}
            source={require('../../../assets/iconApp.png')} 
          />
          ),
          headerTitle: () => <Text style={styles.headerTitle}>Pediatras</Text>,
          headerStyle: {
            backgroundColor: getColor("headerBackgroundColor"),
            height: Dimensions.get("screen").height * .15,
            elevation: 0,
            shadowColor: getColor("shadowColor"),
          },
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default PediatricianStack;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 23,
    paddingTop: 20,
    paddingLeft: 20,
    color: getColor("headerText"),
  },
  iconCalendar: {
    flexDirection: "row",
    padding: 20,
    opacity: 0.6,
  },
  text: {
    color: getColor("headerText"),
    textAlignVertical: "center",
  },
  iconStyle: {
    width: Dimensions.get("screen").height * .065,
    height: Dimensions.get("screen").height * .065,
    marginRight: 40
  }
});
