import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Input } from "react-native-elements";
import { getColor } from "../../../utils/colors";
import { validateEmptyForm } from "../../../utils/validations";
import { postfeeding } from "../../../services/feeding/feeding.service";

const FormulaFeeding = ({ setReloadData, user }) => {
  const [show, setShow] = useState(false);
  const [showHours, setShowHours] = useState(new Date().setHours(0, 0, 0, 0));
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const showTimepicker = () => setShow(!show);
  const [isLoading, setIsLoading] = useState(false);

  const formatDateTime = (receivedDate) => {
    if (receivedDate === undefined || receivedDate === "00:00:00") {
      return `00:00:00`;
    } else {
      let ampm = "am";
      let mins = receivedDate.getMinutes();
      let hrs = receivedDate.getHours();
      if (mins < 10) {
        mins = "0" + mins;
      }
      if (hrs > 12) {
        hrs -= 12;
        ampm = "pm";
      }
      return `${hrs}:${mins}:00 ${ampm}`;
    }
  };

  const submitFeeding = async () => {
    setIsLoading(true);
    formData.feedingType = user.feedingType;
    if (
      validateEmptyForm(formData.date) ||
      validateEmptyForm(formData.quantity) ||
      validateEmptyForm(formData.feedingType)
    ) {
      setIsLoading(false);
      setError("Todos los campos son obligatorios");
    } else {
      let date = new Date();
      console.log(`${date.getDay()} - ${date.getDate()}/${date.getMonth()+1} ${date.getHours()}:${date.getMinutes()} ${date.getTime()}`);
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
          placeholder="0"
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
      <TouchableOpacity onPress={showTimepicker}>
        <Input
          label="Hora"
          labelStyle={styles.text}
          leftIcon={{
            type: "material-community",
            name: "clock-outline",
            color: "rgba(0,0,0,0.5)",
          }}
          leftIconContainerStyle={styles.leftIcon}
          value={formatDateTime(formData.date)}
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
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={showHours}
          mode={"time"}
          display="default"
          onChange={(event, selectedDate) => {
            var date = new Date();
            var firstDay = new Date(date.getUTCFullYear(), date.getUTCMonth(), 1).getUTCDate();
            var lastDay = new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0).getUTCDate();
            console.log("This month first day: ", firstDay);
            console.log("This month last day: ", lastDay);
            setShow(Platform.OS === "ios");
            console.log("Fecha:", selectedDate);
            setFormData({ ...formData, date: selectedDate });
          }}
        />
      )}
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
