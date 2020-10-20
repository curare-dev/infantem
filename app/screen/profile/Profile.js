import React from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { getColor } from "../../utils/colors";
import ProfileTop from "../../components/Profile/ProfileTop";
import ProfileOptions from "../../components/Profile/ProfileOptions";

const Profile = ({ setLogin, user, setReloadProfileInfo }) => {
  return (
    <ScrollView contentContainerStyle={styles.profileContainer}>
      <ProfileTop user={user} />
      <ProfileOptions
        setLogin={setLogin}
        user={user}
        setReloadProfileInfo={setReloadProfileInfo}
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileContainer: {
    flexGrow: 1,
    backgroundColor: getColor("backgroundColor"),
  },
});
