import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon, Text } from "react-native-elements";
import { StyleSheet } from "react-native";
import Diaper from "../../screen/diaper/Diaper";

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
            backgroundColor: "#C5C2FF",
            height: 130,
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
  headerTitle: { fontSize: 25, paddingTop: 20, paddingLeft: 20 },
});
