import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../../screen/profile/Profile";
import { getColor } from "../../utils/colors";
import { getUserById } from "../../services/profile/user.service";

const Stack = createStackNavigator();

const ProfileStack = ({ setLogin }) => {
  const [reloadInfo, setReloadInfo] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    setReloadInfo(false);
    getUserById()
      .then((response) => {
        let {
          username,
          age,
          roles,
          suscription,
          name,
          lastname,
          avatarURL,
        } = response[0];
        setUser({
          username: username,
          age: age,
          rol: roles[0].name,
          suscription: suscription[0].name,
          name: name,
          lastname: lastname,
          avatarURL: avatarURL,
        });
      })
      .catch((error) => console.log(error));
  }, [reloadInfo]);
  // useEffect para recargar el perfil cada que se actualice con llamada de getbyid
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        children={() => (
          <Profile
            setLogin={setLogin}
            user={user}
            setReloadInfo={setReloadInfo}
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
