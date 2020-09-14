import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dreaming from "../../screen/dreaming/Dreaming";
import { Text, StyleSheet } from "react-native";

const Stack = createStackNavigator();

function DreamingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="dreaming"
        component={Dreaming}
        options={{
          headerTitle: () => <Text style={styles.headerTitle}>Dreaming</Text>,
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
}
export default DreamingStack;

const styles = StyleSheet.create({
  headerTitle: { fontSize: 25, paddingTop: 20, paddingLeft: 20 },
});
