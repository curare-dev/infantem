import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import * as SecureStore from "expo-secure-store";

import DreamingStack from "../navigation/stack/DreamingStack";
import FeedingStack from "../navigation/stack/FeedingStack";
import ProfileStack from "./stack/ProfileStack";
import PediatricianStack from "./stack/PediatricianStack";
import DiaperStack from "./stack/DiaperStack";
import Login from "../screen/auth/Login";
import Signup from "../screen/auth/Signup";
import { verifyTokenId } from "../utils/verifyTokenId";
import { getColor } from "../utils/colors";

const Tab = createBottomTabNavigator();

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setLogin(false);
    verifyTokenId()
      .then((response) => {
        if (!response) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      })
      .catch((error) => console.log(error));
  }, [login]);

  const logedIn = () => {
    return (
      <Tab.Navigator
        initialRouteName="feeding"
        tabBarOptions={{
          inactiveTintColor: getColor("inactiveIcon"),
          activeTintColor: getColor("activeIcon"),
          inactiveBackgroundColor: getColor("inactiveBackgroundColor"),
          activeBackgroundColor: getColor("activeBackgroundColor"),
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="feeding"
          component={FeedingStack}
          options={{ title: "Alimentacion" }}
        />
        <Tab.Screen
          name="dreaming"
          component={DreamingStack}
          options={{ title: "Sueño" }}
        />
        <Tab.Screen
          name="diaper"
          component={DiaperStack}
          options={{ title: "Pañales" }}
        />
        <Tab.Screen
          name="pediatrician"
          component={PediatricianStack}
          options={{ title: "Pediatras" }}
        />
        <Tab.Screen
          name="profile"
          children={() => <ProfileStack setLogin={setLogin} />}
          options={{ title: "Perfil" }}
        />
      </Tab.Navigator>
    );
  };
  const notLogedIn = () => {
    return (
      <Tab.Navigator
        initialRouteName="login"
        tabBarOptions={{
          inactiveTintColor: "rgba(60,72,88, 0.4)",
          activeTintColor: "rgba(60,72,88, 0.7)",
          inactiveBackgroundColor: "#A0C4FF",
          activeBackgroundColor: "#A0C4FF",
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
  return (
    <NavigationContainer>
      {isLoggedIn ? logedIn() : notLogedIn()}
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;
  switch (route.name) {
    case "feeding":
      iconName = "baby-bottle";
      break;
    case "dreaming":
      iconName = "sleep";
      break;
    case "diaper":
      iconName = "emoticon-poop";
      break;
    case "profile":
      iconName = "account";
      break;
    case "pediatrician":
      iconName = "account-search";
      break;
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

export default Navigation;
