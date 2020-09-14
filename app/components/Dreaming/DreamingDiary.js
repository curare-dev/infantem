import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Timer from "../../shared/Timer";
import { getColor } from "../../utils/colors";
import DreamingDiaryManual from "./DreamingComponents/DreamingDiaryManual";
import Modal from "../../shared/Modal";

const DreamingDiary = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => setIsVisible(true);
  return (
    <View style={styles.containerDreamingDiary}>
      <Timer />
      <Text style={[styles.textBottom]}>Saturday</Text>

      <TouchableOpacity onPress={toggleModal}>
        <Text style={[styles.textRight]}>Manual</Text>
      </TouchableOpacity>
      <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
        <DreamingDiaryManual setIsVisible={setIsVisible} />
      </Modal>
    </View>
  );
};

export default DreamingDiary;

const styles = StyleSheet.create({
  containerDreamingDiary: {
    flex: 1,
    backgroundColor: getColor("backgroundColor"),
    padding: "10%",
  },
  textRight: {
    alignSelf: "flex-end",
    textDecorationLine: "underline",
    fontSize: 15,
    opacity: 0.5,
  },
  textBottom: {
    alignSelf: "center",
    fontSize: 15,
    opacity: 0.4,
  },
});
