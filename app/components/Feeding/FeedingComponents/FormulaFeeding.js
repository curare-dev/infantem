import React, { useState } from "react";
import { Picker, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Input } from "react-native-elements";
import { getColor } from "../../../utils/colors";
import { validateEmptyForm } from "../../../utils/validations";
import { postfeeding } from "../../../services/feeding/feeding.service";

const FormulaFeeding = ({ setReloadData }) => {
  const [showHours, setShowHours] = useState(new Date().setHours(0, 0, 0, 0));
  const [selectedValue, setSelectedValue] = useState("");
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [error, setError] = useState("");

  const formatDateTime = (receivedDate) => {
    if (receivedDate === undefined || receivedDate === "00:00:00") {
      return `00:00:00`;
    } else {
      let ampm = "am";
      let mins = formData.date.getMinutes();
      let hrs = formData.date.getHours();
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

  const submitFeeding = () => {
    if (
      validateEmptyForm(formData.date) ||
      validateEmptyForm(formData.feedingType) ||
      validateEmptyForm(formData.quantity)
    ) {
      setError("Todos los campos son obligatorios");
    } else {
      postfeeding(formData)
        .then((response) => {
          if (response) {
            setFormData({
              quantity: 0,
              feedingType: selectedValue,
            });
            setError("");
            setReloadData(true);
          } else setError("Error en el sistema");
        })
        .catch(() => setError("Error en el sistema"));
    }
  };
  const showTimepicker = () => setShow(!show);
  return (
    <View styles={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          containerStyle={styles.inputContainerStyle}
          label="Cantidad"
          placeholder="0"
          keyboardType="numeric"
          labelStyle={styles.text}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.nativeEvent.text })
          }
          value={formData.quantity}
        />
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => {
            setFormData({ ...formData, feedingType: itemValue });
            setSelectedValue(itemValue);
          }}
        >
          <Picker.Item label="oz" value="oz" />
          <Picker.Item label="ml" value="ml" />
        </Picker>
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
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={showHours}
          mode={"time"}
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate;
            setShow(Platform.OS === "ios");
            setFormData({ ...formData, date: currentDate });
          }}
        />
      )}
    </View>
  );
};

function defaultFormValue() {
  return {
    quantity: "",
    feedingType: "oz",
  };
}

export default FormulaFeeding;

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
    width: "90%",
  },
  inputContainerStyle: {
    width: "40%",
    alignSelf: "center",
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  errorStyle: {
    marginTop: "3%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "red",
  },
});
