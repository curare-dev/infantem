import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon, Text } from "react-native-elements";
import { Dimensions, StyleSheet, Image } from "react-native";
import Diaper from "../../screen/diaper/Diaper";
import { getColor } from "../../utils/colors";

const Stack = createStackNavigator();
const DiaperStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="diaper"
        component={Diaper}
        options={{
          headerRight: () => (
            <Image 
            style={styles.iconStyle}
            source={require('../../../assets/iconApp.png')} 
          />
          ),
          headerTitle: () => <Text style={styles.headerTitle}>Pañales</Text>,
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
};
export default DiaperStack;

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
