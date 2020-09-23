import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { getColor } from "../../utils/colors";
import ProfileTop from "../../components/Profile/ProfileTop";
import ProfileOptions from "../../components/Profile/ProfileOptions";
import { getUserById } from "../../services/profile/user.service";

const Profile = ({ setLogin }) => {
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
    <ScrollView contentContainerStyle={styles.profileContainer}>
      <ProfileTop user={user} />
      <ProfileOptions
        setLogin={setLogin}
        user={user}
        setReloadInfo={setReloadInfo}
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileContainer: {
    height: Dimensions.get("window").height,
    backgroundColor: getColor("backgroundColor"),
  },
});
