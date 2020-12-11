import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { downloadImageOnS3 } from "../../services/profile/image.service";

const ProfileTop = ({ user }) => {
  const [avatarURL, setAvatarURL] = useState(null);

  useEffect(() => {
    downloadImageOnS3().then( response => {
      setAvatarURL(response);
    }).catch( error => {
      console.log("Hubo un error al obtener URL: ", error);
    });
  }, [user])
  
  return (
    <View style={styles.profileTopContainer}>
      <Avatar
        rounded
        source={{
          uri: avatarURL,
          cache: "reload",
        }}
        renderPlaceholderContent={<ActivityIndicator color="white" />}
        size="xlarge"
        containerStyle={styles.avatarStyle}
      />
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
