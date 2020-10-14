import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../../screen/profile/Profile";
import { getColor } from "../../utils/colors";

const Stack = createStackNavigator();

const ProfileStack = ({ setLogin, user, setReloadProfileInfo }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        children={() => (
          <Profile
            setLogin={setLogin}
            user={user}
            setReloadProfileInfo={setReloadProfileInfo}
          />
        )}
        options={{
          headerTitle: () => (
            <Text style={styles.headerTitle}>{user.name}</Text>
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
};

export default ProfileStack;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 25,
    paddingTop: 20,
    paddingLeft: 20,
    color: getColor("headerText"),
  },
  headerSubtitle: {
    color: getColor("headerText"),
  },
});
