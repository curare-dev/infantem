import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dreaming from "../../screen/dreaming/Dreaming";
import { Text, StyleSheet, Dimensions, Image } from "react-native";
import { getColor } from "../../utils/colors";

const Stack = createStackNavigator();

function DreamingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="dreaming"
        component={Dreaming}
        options={{
          headerRight: () => (
            <Image 
            style={styles.iconStyle}
            source={require('../../../assets/iconApp.png')} 
          />
          ),
          headerTitle: () => (
            <Text style={styles.headerTitle}>Horas de Sueño</Text>
          ),
          headerStyle: {
            backgroundColor: getColor("headerBackgroundColor"),
            height: Dimensions.get("screen").height * .15,
            elevation: 0,
            shadowColor: "transparent",
          },
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
export default DreamingStack;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 23,
    paddingTop: 20,
    paddingLeft: 20,
    color: getColor("headerText"),
  },
  iconStyle: {
    width: Dimensions.get("screen").height * .065,
    height: Dimensions.get("screen").height * .065,
    marginRight: 40
  }
});
