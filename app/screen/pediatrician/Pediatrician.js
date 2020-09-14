import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getColor } from "../../utils/colors";
import FindPediatrician from "../../components/Pediatrician/FindPediatrician";
import Modal from "../../shared/Modal";
import ShowAppointments from "../../components/Pediatrician/ShowAppointments";

const Pediatrician = ({ isVisible, setIsVisible }) => {
  return (
    <View style={styles.screenContainer}>
      <FindPediatrician />
      <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
        <ShowAppointments setIsVisible={setIsVisible} />
      </Modal>
    </View>
  );
};

export default Pediatrician;
console.log(getColor("Type"));
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: getColor("backgroundColor"),
  },
});
