import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Feeding from "../../screen/feeding/Feeding";
import { Icon, Text } from "react-native-elements";
import { Dimensions, StyleSheet } from "react-native";
import { getColor } from "../../utils/colors";

const Stack = createStackNavigator();

const FeedingStack = ({ user }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="feeding"
        children={() => <Feeding user={user} />}
        options={{
          headerTitle: () => (
            <Text style={styles.headerTitle}>Alimentación</Text>
          ),
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
export default FeedingStack;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    paddingTop: 20,
    paddingLeft: 20,
    color: getColor("headerText"),
  },
});
