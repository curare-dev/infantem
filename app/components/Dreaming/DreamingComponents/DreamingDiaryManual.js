import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getColor } from "../../../utils/colors";
import { validateEmptyForm } from "../../../utils/validations";
import { postDreaming } from "../../../services/dreaming/dreaming.service";

const DreamingDiaryManual = ({ setReloadData, setIsVisible }) => {
  const [showHours, setShowHours] = useState(new Date().setHours(0, 0, 0, 0));
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [error, setError] = useState("");

  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  let day = days[date.getDay()];
  let mins = date.getMinutes();
  let hrs = date.getHours();
  let dateF = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let ampm = "am";

  const showTimepicker = () => setShow(!show);

  const submitDreamingManual = () => {
    if (
      validateEmptyForm(formData.date) ||
      validateEmptyForm(formData.dreamingType) ||
      validateEmptyForm(formData.quantity)
    ) {
      console.log(formData);
      setError("Todos los campos son obligatorios");
    } else {
      postDreaming(formData)
        .then((response) => {
          if (response) {
            setFormData({
              date: "00:00:00",
              quantity: 0,
            });
            setError("");
            setIsVisible(false);
            setReloadData(true);
          } else setError("Error en el sistema");
        })
        .catch((error) => {
          setError("Error en el sistema, Catch");
        });
    }
  };
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
      return `${hrs}:${mins}:00`;
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={showTimepicker}>
        <Input
          label="Duración del sueño"
          value={formatDateTime(formData.date)}
          disabled
          errorStyle={styles.errorStyle}
          errorMessage={error}
        />
      </TouchableOpacity>
      <Button
        title="Ingresar tiempo de sueño"
        onPress={submitDreamingManual}
        buttonStyle={styles.buttonStyle}
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
            setFormData({
              date: currentDate,
              dreamingType: "Secs",
              quantity:
                currentDate.getHours() * 60 * 60 +
                currentDate.getMinutes() * 60,
            });
          }}
        />
      )}
    </View>
  );
};

function defaultFormValue() {
  return {
    quantity: "",
    dreamingType: "Secs",
  };
}

export default DreamingDiaryManual;

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf: "center",
    backgroundColor: getColor("buttonColor"),
    width: "90%",
  },
});
