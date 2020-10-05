import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { getColor } from "../../utils/colors";
import ProfileTop from "../../components/Profile/ProfileTop";
import ProfileOptions from "../../components/Profile/ProfileOptions";

const Profile = ({ setLogin, user, setReloadInfo }) => {
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
