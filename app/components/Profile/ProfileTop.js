import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";

const ProfileTop = ({ user }) => {
  console.log("USER: ", user);
  return (
    <View style={styles.profileTopContainer}>
      <Avatar
        rounded
        source={{
          uri: user.avatarURL
        }}
        size="xlarge"
        containerStyle={styles.avatarStyle}
      ></Avatar>
      <View style={styles.nameAgeContainer}>
        <Text style={[styles.title, styles.topText]}>{user.name}</Text>
        <Text style={[styles.subtitle, styles.topText]}>
          {user.age === undefined ? "Colocar Edad" : user.age}
        </Text>
      </View>
    </View>
  );
};

export default ProfileTop;

const styles = StyleSheet.create({
  profileTopContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  avatarStyle: {
    marginTop: "1%",
  },
  nameAgeContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    opacity: 0.7,
    textAlignVertical: "center",
  },
  subtitle: {
    opacity: 0.5,
  },
  topText: {
    fontSize: 20,
  },
});
