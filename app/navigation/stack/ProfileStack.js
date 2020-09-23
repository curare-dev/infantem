import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../../screen/profile/Profile";

const Stack = createStackNavigator();

const ProfileStack = ({ setLogin }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        children={() => <Profile setLogin={setLogin} />}
        options={{
          headerTitle: () => <Text style={styles.headerTitle}></Text>,
          headerStyle: {
            backgroundColor: "#C5C2FF",
            elevation: 0,
            shadowColor: "transparent",
          },
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProfileStack;

const styles = StyleSheet.create({
  headerTitle: { fontSize: 25, paddingTop: 20, paddingLeft: 20 },
});
