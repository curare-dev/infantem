import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "../../../shared/Modal";
import Timer from "../../../shared/Timer";
import FeedingDiaryManual from "./FeedingDiaryManual";
import { Button } from "react-native-elements";
import { getColor } from "../../../utils/colors";
import { postfeeding } from "../../../services/feeding/feeding.service";
import { validateEmptyForm } from "../../../utils/validations";

const BreastFeeding = ({ setReloadData }) => {
  const [time, setTime] = useState(null);
  const [resetTimer, setResetTimer] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => setIsVisible(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getComponent = (component) => {
    switch (component) {
      case "manual":
        setRenderComponent(
          <FeedingDiaryManual
            setReloadData={setReloadData}
            setIsVisible={setIsVisible}
          />
        );
        break;
    }
  };
  const submitBreastfeeding = () => {
    setIsLoading(true);
    if (validateEmptyForm(time) || time === 0) {
      setIsLoading(false);
      setError("El timer esta en 0");
    } else {
      postfeeding({
        date: new Date(),
        feedingType: "Secs",
        quantity: time,
      })
        .then(() => {
          setIsLoading(false);
          setResetTimer(true);
          setError("");
          setReloadData(true);
        })
        .catch(() => {
          setIsLoading(false);
          setError("Error en el sistema");
        });
    }
  };
  return (
    <View>
      <Timer
        setTime={setTime}
        resetTimer={resetTimer}
        setResetTimer={setResetTimer}
      />
      <TouchableOpacity
        onPress={() => {
          getComponent("manual");
          toggleModal();
        }}
      >
        <Text style={[styles.textRight]}>Manual</Text>
      </TouchableOpacity>
      <Text style={styles.errorStyle}>{error}</Text>
      <Button
        title="Agregar"
        containerStyle={styles.buttonContainerStyle}
        buttonStyle={styles.buttonStyle}
        onPress={submitBreastfeeding}
        loading={isLoading}
      />
      <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
        {renderComponent}
      </Modal>
    </View>
  );
};

export default BreastFeeding;

const styles = StyleSheet.create({
  textRight: {
    alignSelf: "flex-end",
    textDecorationLine: "underline",
    fontSize: 15,
    opacity: 0.5,
  },
  buttonContainerStyle: {
    marginTop: "1%",
    alignSelf: "center",
    width: "90%",
  },
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
  },
  errorStyle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "red",
  },
});
