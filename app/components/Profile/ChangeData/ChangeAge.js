import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, BottomSheet, ListItem } from "react-native-elements";
import { updateUserById } from "../../../services/profile/user.service";
import { showAd } from "../../../shared/Ads";
import { getColor } from "../../../utils/colors";
import { day, month, year } from "../../../utils/date";
import { validateEmptyForm } from "../../../utils/validations";

const ChangeAge = ({ setIsVisible, setReloadProfileInfo }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const updateAge = () => {
    console.log(formData);
    if (validateEmptyForm(formData)) {
      setError("Todos los campos son obligatorios");
    } else {
      updateUserById({ age: formData.day + "/" + formData.monthNumber + "/" + formData.year })
        .then((response) => {
          showAd();
          setReloadProfileInfo(true);
          setIsVisible(false);
          setError("");
        })
        .catch((error) => console.error(error));
    }
  };

  const handleTouch = (input) => {
    setBottomSheetVisible(true);
    switch (input) {
      case 'day':
        setRenderComponent(day().map( (v, i) => {
          return (
            <ListItem
            key={i}
            onPress={ () => {
              setFormData({...formData, day: v < 10 ? `0${v}` : `${v}`  })
              setBottomSheetVisible(false)
            }}
            >
            <ListItem.Content>
              <ListItem.Title>{v}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          )
        }));
      break;
      case 'month':
        setRenderComponent(month().map( (v, i) => {
          return (
            <ListItem
            key={i}
            onPress={ () => {
              setFormData({...formData, month: v, monthNumber: i+1 < 10 ? `0${i+1}` : i+1 })
              setBottomSheetVisible(false)
            }}
            >
            <ListItem.Content>
              <ListItem.Title>{v}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          )
        }));
      break;
      case 'year':
        setRenderComponent(year().map( (v, i) => {
          return (
            <ListItem
            key={i}
            onPress={ () => {
              setFormData({...formData, year: v.toString() })
              setBottomSheetVisible(false)
            }}
            >
            <ListItem.Content>
              <ListItem.Title>{v}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          )
        }));
      break;
    }
  }

  return (
    <View>
      <View style={{ flexDirection: "row",justifyContent: "space-between",}}>
        <TouchableOpacity 
          style={styles.touchableStyle}
          onPress={() => handleTouch('day')}
        >
          <Input
            label="Día"
            placeholder="DD"
            containerStyle={{alignSelf: "center"}}
            labelStyle={{alignSelf: "center"}}
            style={{textAlign: "center"}}
            value={ formData.day }
            disabled
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.touchableStyle}
          onPress={() => handleTouch('month')}
        >
          <Input
            label="Mes"
            placeholder="MM"
            containerStyle={{alignSelf: "center"}}
            labelStyle={{alignSelf: "center"}}
            style={{textAlign: "center"}}
            value={ formData.month }
            disabled
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.touchableStyle}
          onPress={() => handleTouch('year')}
        >
          <Input
            label="Año"
            placeholder="AAAA"
            containerStyle={{alignSelf: "center"}}
            labelStyle={{alignSelf: "center"}}
            style={{textAlign: "center"}}
            value={ formData.year }
            disabled
          />
        </TouchableOpacity>
      </View>
      <Button
        title="Cambiar Fecha de Nacimiento"
        containerStyle={styles.buttonContainer} 
        buttonStyle={styles.buttonStyle}
        onPress={updateAge}
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

export default ChangeAge;

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "center",
    width: "90%",
    color: "white"
  },
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
  },
  touchableStyle: {
    backgroundColor: getColor("cardColor"),
    width: "30%",
  },
  listItemContainerStyle: {
    marginBottom: "1%",
  },
});
