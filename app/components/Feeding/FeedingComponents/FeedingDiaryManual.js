import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, Button, ListItem, BottomSheet } from "react-native-elements";
import { getColor } from "../../../utils/colors";
import { postfeeding } from "../../../services/feeding/feeding.service";
import { formatedDate } from "../../../shared/FormatedDate";
import { hours, minutes } from "../../../utils/date";
import Modal from "../../../shared/Modal";

const FeedingDiaryManual = ({ setReloadData, setIsVisible }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  let [mins, setMins] = useState(null);
  let [hrs, setHrs] = useState(null);

  const submitFeedingManual = () => {
    if(!hrs && !mins){
      setError("Todos los campos son obligatorios");
    } else {
      hrs ? hrs  : hrs = 0;
      mins ? mins : mins = 0;
      formData.quantity = hrs + mins;
      formData.feedingType= "Secs";
      formData.date = formatedDate();
      postfeeding(formData)
        .then((response) => {
          if (response) {
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

  const handleTouch = (input) => {
    setBottomSheetVisible(true);
    switch (input) {
      case 'hrs':
        setRenderComponent(hours().map( (v, i) => {
          return (
            <ListItem
            key={i}
            onPress={ () => {
              setHrs(v * 3600 )
              setBottomSheetVisible(false)
            }}
            >
            <ListItem.Content>
              <ListItem.Title style={{textAlign: 'center'}}>{v}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          )
        }))
      break;
      case 'mins':
        setRenderComponent(minutes().map( (v, i) => {
          return (
            <ListItem
            key={i}
            onPress={ () => {
              setMins(v * 60)
              setBottomSheetVisible(false)
            }}
            >
            <ListItem.Content>
              <ListItem.Title>{v}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          )
        }))
      break;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.secViewInput}>
        <TouchableOpacity 
          style={styles.touchableStyle}
          onPress={() => handleTouch('hrs')}
        >
          <Input 
            style={styles.input} 
            label="Horas"
            labelStyle={styles.input}
            value={ hrs ? `${hrs / 3600 < 10 ? `0${hrs / 3600}`: hrs / 3600}` : '00' }
            disabled
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => handleTouch('mins')}
        >
          <Input 
            style={styles.input} 
            label="Minutos" 
            labelStyle={styles.input}
            placeholder="00"
            value={ mins ? `${mins / 60 < 10 ? `0${mins / 60}`: mins / 60}` : '00' }
            disabled
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.errorStyle}>{error}</Text>
      <Button
        title="Ingresar Alimentación"
        onPress={submitFeedingManual}
        buttonStyle={styles.buttonStyle}
      />
      <BottomSheet
        isVisible={bottomSheetVisible}
        setIsVisible={setBottomSheetVisible}
        modalProps={{ onRequestClose: () => { setIsVisible(false)}}}
      >
        {renderComponent}
      </BottomSheet>
    </View>
  );
};

export default FeedingDiaryManual;

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
  },
  container: {
    alignSelf: "center"
  },
  touchableStyle: {
    backgroundColor: getColor("cardColor"),
    width: "40%",
  },
  input: {
    textAlign: 'center'
  }
});
