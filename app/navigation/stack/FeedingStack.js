import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Feeding from "../../screen/feeding/Feeding";
import { Text } from "react-native-elements";
import { Dimensions, StyleSheet, Image } from "react-native";
import { getColor } from "../../utils/colors";

const Stack = createStackNavigator();

const FeedingStack = ({ user }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="feeding"
        children={() => <Feeding user={user} />}
        options={{
          headerRight: () => (
            <Image 
            style={styles.iconStyle}
            source={require('../../../assets/iconApp.png')} 
          />
          ),
          headerTitle: () => (
            <Text style={styles.headerTitle}>Alimentación</Text>
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
};
export default FeedingStack;

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
