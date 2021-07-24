import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getColor } from "../../utils/colors";
import FindPediatrician from "../../components/Pediatrician/FindPediatrician";

const Pediatrician = () => {
  return (
    <View style={styles.screenContainer}>
      <FindPediatrician />
    </View>
  );
};

export default Pediatrician;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: getColor("backgroundColor"),
  },
});
