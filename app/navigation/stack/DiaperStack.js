import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon, Text } from "react-native-elements";
import { Dimensions, StyleSheet } from "react-native";
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
          headerTitle: () => <Text style={styles.headerTitle}>Pañales</Text>,
          headerStyle: {
            backgroundColor: getColor("headerBackgroundColor"),
            height: Dimensions.get("screen").height * .14,
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
    fontSize: 20,
    paddingTop: 20,
    paddingLeft: 20,
    color: getColor("headerText"),
  },
});
