import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
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
          headerTitle: () => <Text style={styles.headerTitle}>Pediatras</Text>,
          headerStyle: {
            backgroundColor: getColor("headerBackgroundColor"),
            height: Dimensions.get("screen").height * .14,
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
    fontSize: 20,
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
});
