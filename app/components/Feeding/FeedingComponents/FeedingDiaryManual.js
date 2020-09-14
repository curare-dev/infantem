import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getColor } from "../../../utils/colors";

const FeedingDiaryManual = ({ setIsVisible }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
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
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const submitDreamingManual = () => {
    console.log(date);
    setIsVisible(false);
  };
  const formatDateTime = (type) => {
    switch (type) {
      case "time":
        if (mins < 10) {
          mins = "0" + mins;
        }
        if (hrs > 12) {
          hrs -= 12;
          ampm = "pm";
        }
        return `${hrs}:${mins}:00`;
      case "date":
        return `${day} ${dateF}-${month}-${year}`;
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={showTimepicker}>
        <Input
          label="Duración de la alimentación"
          value={formatDateTime("time")}
          disabled
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={showDatepicker}>
        <Input
          label="Fecha de alimentación"
          value={formatDateTime("date")}
          disabled
        />
      </TouchableOpacity>
      <Button
        title="Ingresar Alimentacióm"
        onPress={submitDreamingManual}
        buttonStyle={styles.buttonStyle}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          is12Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default FeedingDiaryManual;

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf: "center",
    backgroundColor: getColor("buttonColor"),
    width: "90%",
  },
});
