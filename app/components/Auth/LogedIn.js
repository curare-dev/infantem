import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import DreamingStack from "../../navigation/stack/DreamingStack";
import FeedingStack from "../../navigation/stack/FeedingStack";
import ProfileStack from "../../navigation/stack/ProfileStack";
import DiaperStack from "../../navigation/stack/DiaperStack";
import PediatricianStack from "../../navigation/stack/PediatricianStack";
import { Icon } from "react-native-elements";
import { getUserById } from "../../services/profile/user.service";
import { getColor } from "../../utils/colors";

const Tab = createBottomTabNavigator();

const LogedIn = ({ setLogin }) => {
  const [user, setUser] = useState({});
  const [reloadProfileInfo, setReloadProfileInfo] = useState(false);
  useEffect(() => {
    setReloadProfileInfo(false);
    const getUser = async () => {
      console.log("Se recarga el perfil");
      const feedingType = await SecureStore.getItemAsync("mUnit");
      await getUserById()
        .then((response) => {
          let {
            age,
            roles,
            suscription,
            name,
            lastname,
            avatarURL,
          } = response[0];
          setUser({
            age,
            rol: roles[0].name,
            suscription: suscription[0].name,
            name,
            lastname,
            avatarURL,
            feedingType,
          });
        })
        .catch((error) => console.log(error));
    };
    getUser();
  }, [reloadProfileInfo]);

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
        children={() => <FeedingStack user={user} />}
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
        children={() => <PediatricianStack />}
        options={{ title: "Pediatras" }}
      />
      <Tab.Screen
        name="profile"
        children={() => (
          <ProfileStack
            setLogin={setLogin}
            user={user}
            setReloadProfileInfo={setReloadProfileInfo}
          />
        )}
        options={{ title: "Perfil" }}
      />
    </Tab.Navigator>
  );
};

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

export default LogedIn;

const styles = StyleSheet.create({});
