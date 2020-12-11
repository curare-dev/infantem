import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { getColor } from "../../utils/colors";
import { Input, Button, ListItem, BottomSheet } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDateTime } from "../../shared/FormatedDate";

const Appointment = ({ setVisible }) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [subject, setSubject] = useState("Selecciona el asunto");

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

  const submitAppointment = () => {
    console.log("Creando Cita y enviando correo con la confirmación");
    setVisible(false);
  };

  const list = [
    // meter esto a la base de datos
    {
      title: "Consulta de primera vez",
      subject: "Consulta de primera vez",
      onPress: () => {
        setIsVisible(false);
      },
    },
    {
      title: "Consulta de única ocasión",
      subject: "Consulta de única ocasión",
      onPress: () => {
        setIsVisible(false);
      },
    },
    {
      title: "Cita de Control",
      subject: "Cita de Control",
      onPress: () => {
        setIsVisible(false);
      },
    },
    {
      title: "Consulta de Emergencia",
      subject: "Consulta de Emergencia",
      onPress: () => {
        setIsVisible(false);
      },
    },
    {
      title: "Cancelar",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
      <Input
        label="Nombre"
        labelStyle={styles.text}
        leftIcon={{
          type: "material-community",
          name: "account-outline",
          color: "rgba(0,0,0,0.5)",
        }}
        value="Bárbara Martínez"
        disabled
      />
      <TouchableOpacity onPress={showTimepicker}>
        <Input
          label="Hora"
          labelStyle={styles.text}
          leftIcon={{
            type: "material-community",
            name: "clock-outline",
            color: "rgba(0,0,0,0.5)",
          }}
          value={formatDateTime("time")}
          leftIconContainerStyle={styles.leftIcon}
          disabled
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={showDatepicker}>
        <Input
          label="Fecha"
          labelStyle={styles.text}
          leftIcon={{
            type: "material-community",
            name: "calendar-heart",
            color: "rgba(0,0,0,0.5)",
          }}
          leftIconContainerStyle={styles.leftIcon}
          value={formatDateTime("date")}
          disabled
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Input
          label="Asunto"
          labelStyle={styles.text}
          leftIcon={{
            type: "material-community",
            name: "text-subject",
            color: "rgba(0,0,0,0.5)",
          }}
          leftIconContainerStyle={styles.leftIcon}
          value={subject}
          disabled
        />
      </TouchableOpacity>
      <BottomSheet isVisible={isVisible}>
        {list.map((l, i) => {
          return (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={() => {
                setSubject(l.subject);
                setIsVisible(false);
              }}
            >
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </BottomSheet>
      <Button
        title="Crear Cita"
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        onPress={submitAppointment}
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
    </ScrollView>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: "5%",
    marginBottom: "10%",
    alignItems: "center",
  },
  textBottom: {
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    opacity: 0.5,
  },
  subText: {
    fontSize: 15,
    marginTop: 5,
    opacity: 0.4,
  },
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
    width: "90%",
  },
  leftIcon: {
    marginRight: "5%",
  },
});
