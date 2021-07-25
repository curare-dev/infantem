import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { ButtonGroup, Input, BottomSheet, ListItem } from 'react-native-elements'
import { getColor } from '../utils/colors';
import { hours, minutes } from "./../utils/date";

const TimeForm = ({setTime, setIsVisible}) => {
    const [error, setError] = useState(null);
    const [dateTime, setDateTime] = useState({});
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);

    const handleTouch = (input) => {
        setBottomSheetVisible(true);
        switch (input) {
          case 'hrs':
            setRenderComponent(hours().map( (v, i) => {
              return (
                <ListItem
                key={i}
                onPress={ () => {
                setDateTime({
                    ...dateTime,
                    hrs: v
                });
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
                setDateTime({
                    ...dateTime,
                    mins: v
                });
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
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center" }}>
                <TouchableOpacity           
                    style={styles.touchableStyle}
                    onPress={() => handleTouch('hrs')}
                >
                    <Input
                        label="Hora"
                        placeholder="00"
                        inputStyle={{textAlign: "center"}}
                        labelStyle={{textAlign: "center"}}
                        value={ dateTime.hrs ? `${dateTime.hrs}` : '00' }
                        disabled
                    />
                </TouchableOpacity>
                <TouchableOpacity           
                    style={styles.touchableStyle}
                    onPress={() => handleTouch('mins')}
                >
                    <Input 
                        label="Minutos"
                        placeholder="00"
                        inputStyle={{textAlign: "center"}}
                        labelStyle={{textAlign: "center"}}
                        value={ dateTime.mins ? `${dateTime.mins}` : '00' }
                        disabled
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.errorStyle}>{error}</Text>
            <ButtonGroup 
                onPress={(e)=>{
                    if(dateTime.hrs !== undefined){
                        if( ( e === 0 && dateTime.hrs < 13 ) || (e === 1 && dateTime.hrs < 13) ){
                            setTime({
                                hrs: e === 1 ? (Number(dateTime.hrs) + 12) : dateTime.hrs,
                                mins: dateTime.mins ? dateTime.mins < 10 ? `0${dateTime.mins}` : dateTime.mins : "00",
                                dateTime: `${dateTime.hrs ? dateTime.hrs < 10 ? `0${dateTime.hrs}` : dateTime.hrs : "00"}:${dateTime.mins ? dateTime.mins < 10 ? `0${dateTime.mins}` : dateTime.mins : "00"} ${ e === 0 ? "am" : "pm"}`
                            });     
                            setIsVisible(false);
                        } else {
                            setError("Favor de colocar la hora correctamente");
                        }
                    } else {
                        setError("Favor de colocar la hora");
                    }

                }}
                buttons={[
                    'AM',
                    'PM'
                ]}
                containerStyle={styles.buttonContainer} 
                buttonStyle={styles.buttonStyle}
                textStyle={{color: "white"}}
            />
            <BottomSheet
                isVisible={bottomSheetVisible}
                setIsVisible={setBottomSheetVisible}
            >
                {renderComponent}
            </BottomSheet>
        </View>
    )
}

export default TimeForm;

const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: "center",
        width: "90%",
        color: "white"
      },
      buttonStyle: {
        backgroundColor: getColor("buttonColor"),
      },
    errorStyle: {
        marginTop: "-3%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15,
        color: "red",
    },
    touchableStyle: {
        backgroundColor: getColor("cardColor"),
        width: "40%",
    },
})
