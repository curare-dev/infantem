import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { getColor } from "../../../utils/colors";
import { postDreaming } from "../../../services/dreaming/dreaming.service";
import { formatedDate } from "../../../shared/FormatedDate";

const DreamingDiaryManual = ({ setReloadData, setIsVisible }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  let [mins, setMins] = useState(null);
  let [hrs, setHrs] = useState(null);

  const submitDreamingManual = () => {
    if(!hrs && !mins){
      setError("Todos los campos son obligatorios");
    } else {
      hrs ? hrs  : hrs = 0;
      mins ? mins : mins = 0;
      formData.quantity = hrs + mins;
      formData.dreamingType= "Secs";
      formData.date = formatedDate();
      postDreaming(formData)
        .then((response) => {
          if (response) {
            console.log(formData);
            setError("");
            setIsVisible(false);
            setReloadData(true);
          } else setError("Error en el sistema");
        })
        .catch((error) => {
          console.log(error);
          setError("Error en el sistema, Catch");
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.secViewInput}>
        <Input 
          style={styles.input} 
          label="Horas"
          labelStyle={styles.inputA}
          keyboardType="numeric"
          onChange={(e) => {
            let hrsInput = e.nativeEvent.text * 3600
            setHrs(hrsInput);
          }} 
          placeholder="00"
        />
        <Input 
          style={styles.input} 
          label="Minutos" 
          labelStyle={styles.inputB}
          keyboardType="numeric"
          onChange={(e) => {
            let minsInput =  e.nativeEvent.text * 60
            setMins(minsInput);
          }} 
          placeholder="00"
        /> 
      </View>
      <Text style={styles.errorStyle}>{error}</Text>
      <Button
        title="Ingresar Sueño"
        onPress={submitDreamingManual}
        buttonStyle={styles.buttonStyle}
      />
    </View>
  );
};

export default DreamingDiaryManual;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
    width: "90%",
    alignSelf: "center",
    textAlign: "center"
  },
  errorStyle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "red",
  },
  secViewInput:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  container: {
    alignSelf: "center"
  }
});
