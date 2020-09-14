import React, { useState } from "react";
import { StyleSheet, View, Switch, TouchableOpacity } from "react-native";
import Timer from "../../shared/Timer";
import { Input, Button, Text } from "react-native-elements";
import { getColor } from "../../utils/colors";
import Modal from "../../shared/Modal";
import FeedingDiaryManual from "./FeedingComponents/FeedingDiaryManual";

const FeedingDiary = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => setIsVisible(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={styles.containerFeedingDiary}>
      <View style={styles.viewSwitch}>
        <Text style={styles.subText}>Formula Feeding</Text>
        <Switch
          trackColor={{
            false: "rgba(60,72,88, 0.4)",
            true: "rgba(60,72,88, 0.7)",
          }}
          thumbColor={isEnabled ? "#9E99FF" : "#B9AAFF"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={styles.subText}>BreastFeeding</Text>
      </View>
      {!isEnabled ? (
        <View>
          <Input
            label="Cantidad"
            keyboardType="numeric"
            labelStyle={styles.text}
          />
          <Input label="Hora" labelStyle={styles.text} />
          <Input
            label="Fecha"
            labelStyle={styles.text}
            defaultValue="Hoy"
            disabled={true}
            style
          />
          <Text style={[styles.textBottom, styles.text]}>10 Oz</Text>
          <Text style={[styles.textBottom, styles.subText]}>Sabado</Text>
          <Button
            title="Agregar"
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      ) : (
        <View>
          <Timer />
          <Text style={[styles.textBottom]}>Saturday</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={[styles.textRight]}>Manual</Text>
          </TouchableOpacity>
          <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
            <FeedingDiaryManual setIsVisible={setIsVisible} />
          </Modal>
        </View>
      )}
    </View>
  );
};

export default FeedingDiary;

const styles = StyleSheet.create({
  viewSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: "5%",
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  textBottom: {
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    opacity: 0.7,
  },
  subText: {
    fontSize: 15,
    opacity: 0.4,
  },
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
    width: "90%",
  },
  containerFeedingDiary: {
    flex: 1,
    backgroundColor: getColor("backgroundColor"),
    padding: "5%",
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
