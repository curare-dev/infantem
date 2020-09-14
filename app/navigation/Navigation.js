import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import DearDiaryStack from "../navigation/stack/DearDiaryStack";
import DreamingStack from "../navigation/stack/DreamingStack";
import FeedingStack from "../navigation/stack/FeedingStack";
import ProfileStack from "./stack/ProfileStack";
import PediatricianStack from "./stack/PediatricianStack";
import DiaperStack from "./stack/DiaperStack";

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="feeding"
        tabBarOptions={{
          inactiveTintColor: "rgba(60,72,88, 0.4)",
          activeTintColor: "rgba(60,72,88, 0.7)",
          inactiveBackgroundColor: "#C5C2FF",
          activeBackgroundColor: "#ECEBFF",
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
          component={ProfileStack}
          options={{ title: "Perfil" }}
        />
      </Tab.Navigator>
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
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}

export default Navigation;
