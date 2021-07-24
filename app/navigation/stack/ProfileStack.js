import React from "react";
import { Dimensions, StyleSheet, Text, Image } from "react-native";
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
          headerRight: () => (
            <Image 
            style={styles.iconStyle}
            source={require('../../../assets/iconApp.png')} 
          />
          ),
          headerTitle: () => (
            <Text style={styles.headerTitle}>Perfil</Text>
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

export default ProfileStack;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 23,
    paddingTop: 20,
    paddingLeft: 20,
    color: getColor("headerText"),
  },
  headerSubtitle: {
    color: getColor("headerText"),
  },
  iconStyle: {
    width: Dimensions.get("screen").height * .065,
    height: Dimensions.get("screen").height * .065,
    marginRight: 40
  }
});
