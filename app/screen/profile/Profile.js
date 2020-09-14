import React from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { getColor } from "../../utils/colors";
import ProfileTop from "../../components/Profile/ProfileTop";
import ProfileOptions from "../../components/Profile/ProfileOptions";

const Profile = () => {
  return (
    <ScrollView contentContainerStyle={styles.profileContainer}>
      <ProfileTop />
      <ProfileOptions />
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
