import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dreaming from "../../screen/dreaming/Dreaming";
import { Text, StyleSheet } from "react-native";
import { getColor } from "../../utils/colors";

const Stack = createStackNavigator();

function DreamingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="dreaming"
        component={Dreaming}
        options={{
          headerTitle: () => (
            <Text style={styles.headerTitle}>Horas de Sueño</Text>
          ),
          headerStyle: {
            backgroundColor: getColor("headerBackgroundColor"),
            height: 130,
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
    fontSize: 25,
    paddingTop: 20,
    paddingLeft: 20,
    color: getColor("headerText"),
  },
});
