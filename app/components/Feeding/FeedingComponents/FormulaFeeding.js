import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { getColor } from "../../../utils/colors";
import { validateEmptyForm } from "../../../utils/validations";
import { postfeeding } from "../../../services/feeding/feeding.service";
import Modal from "../../../shared/Modal";
import TimeForm from "../../../shared/TimeForm";

const FormulaFeeding = ({ setReloadData, user }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState({});

  const submitFeeding = async () => {
    setIsLoading(true);
    formData.feedingType = user.feedingType;
    let dateTime = new Date();
    dateTime.setHours(time.hrs,time.mins,0);
    let date = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate();
    let hrs = dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : dateTime.getHours();
    let mins = dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes();
    formData.date = `${dateTime.getFullYear()}-${dateTime.getMonth()+1}-${date}T${hrs}:${mins}:00.000Z`;
    if (
      validateEmptyForm(formData.date) ||
      validateEmptyForm(formData.quantity) ||
      validateEmptyForm(formData.feedingType)
    ) {
      setIsLoading(false);
      setError("Todos los campos son obligatorios");
    } else {
      console.log("FORMULA FEEDING", formData);
      await postfeeding(formData)
        .then((response) => {
          if (response) {
            setIsLoading(false);
            setFormData({ quantity: "" });
            setError("");
            setReloadData(true);
          } else setError("Error en el sistema");
        })
        .catch(() => {
          setIsLoading(false);
          setError("Error en el sistema");
        });
    }
  };

  return (
    <View style={styles.formulaFeedingContainer}>
      <View style={styles.quantityMeasureContainer}>
        <Input
          label="Cantidad"
          keyboardType="numeric"
          labelStyle={styles.text}
          onChange={(e) => {
            setFormData({ ...formData, quantity: e.nativeEvent.text });
          }}
          value={formData.quantity}
        />
        <Input
          label="Medida"
          value={
            user.feedingType === "oz"
              ? "Onzas"
              : user.feedingType === "ml"
              ? "Mililitros"
              : "No Definido"
          }
          disabled
        />
      </View>
      <TouchableOpacity onPress={()=>setIsVisible(true)}>
        <Input
          label="Hora"
          labelStyle={styles.text}
          placeholder="00:00"
          leftIcon={{
            type: "material-community",
            name: "clock-outline",
            color: "rgba(0,0,0,0.5)",
          }}
          leftIconContainerStyle={styles.leftIcon}
          value={time.dateTime}
          disabled
          errorStyle={styles.errorStyle}
          errorMessage={error}
        />
      </TouchableOpacity>
      <Button
        title="Agregar"
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        onPress={submitFeeding}
        loading={isLoading}
      />
      <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
        { <TimeForm setTime={setTime} setIsVisible={setIsVisible} /> }
      </Modal>
    </View>
  );
};

export default FormulaFeeding;

const styles = StyleSheet.create({
  quantityMeasureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
  formulaFeedingContainer: {
    margin: "5%",
  },
  buttonContainer: {
    alignSelf: "center",
    width: "90%",
  },
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
  },
  errorStyle: {
    marginTop: "3%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "red",
  },
});
