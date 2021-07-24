import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../../screen/auth/Login";
import Signup from "../../screen/auth/Signup";
import { Icon } from "react-native-elements";
import { getColor } from "../../utils/colors";

const Tab = createBottomTabNavigator();

const NotLogedIn = ({ setLogin }) => {
  return (
    <Tab.Navigator
      initialRouteName="login"
      tabBarOptions={{
        inactiveTintColor: getColor("inactiveIcon"),
        activeTintColor: getColor("activeIcon"),
        inactiveBackgroundColor: getColor("inactiveBackgroundColor"),
        activeBackgroundColor: getColor("activeBackgroundColor"),
        style: {
          height: '5%'
        }
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
      })}
    >
      <Tab.Screen
        name="login"
        children={() => <Login setLogin={setLogin} />}
        options={{ title: "Ingreso" }}
      />
      <Tab.Screen
        name="signup"
        children={() => <Signup setLogin={setLogin} />}
        options={{ title: "Registro" }}
      />
    </Tab.Navigator>
  );
};

export default NotLogedIn;

function screenOptions(route, color) {
  let iconName;
  switch (route.name) {
    case "login":
      iconName = "login";
      break;
    case "signup":
      iconName = "account-plus";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}

const styles = StyleSheet.create({});
