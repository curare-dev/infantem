import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Feeding from "../../screen/feeding/Feeding";
import { Icon, Text } from "react-native-elements";
import { StyleSheet } from "react-native";
const Stack = createStackNavigator();
const FeedingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="feeding"
        component={Feeding}
        options={{
          headerTitle: () => <Text style={styles.headerTitle}>Feeding</Text>,
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
export default FeedingStack;

const styles = StyleSheet.create({
  headerTitle: { fontSize: 25, paddingTop: 20, paddingLeft: 20 },
});
