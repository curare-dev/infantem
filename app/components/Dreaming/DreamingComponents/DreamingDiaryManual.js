import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, Button, BottomSheet, ListItem } from "react-native-elements";
import { getColor } from "../../../utils/colors";
import { postDreaming } from "../../../services/dreaming/dreaming.service";
import { formatedDate } from "../../../shared/FormatedDate";
import { hours, minutes } from "../../../utils/date";


const DreamingDiaryManual = ({ setReloadData, setIsVisible }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
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
              setMins(v * 60 )
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
            placeholder="00"
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
            value={ mins ? `${mins / 60 < 10 ? `0${mins / 60}`: mins / 60}` : '00' }
            placeholder="00"
            disabled
          /> 
        </TouchableOpacity>
      </View>
      <Text style={styles.errorStyle}>{error}</Text>
      <Button
        title="Ingresar Sueño"
        onPress={submitDreamingManual}
        buttonStyle={styles.buttonStyle}
      />
      <BottomSheet
        isVisible={bottomSheetVisible}
        setIsVisible={setBottomSheetVisible}
      >
        {renderComponent}
      </BottomSheet>
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
