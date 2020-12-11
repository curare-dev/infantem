import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ButtonGroup, Input } from 'react-native-elements'
import { getColor } from '../utils/colors';

const TimeForm = ({setTime, setIsVisible}) => {
    const [error, setError] = useState(null);
    const [dateTime, setDateTIme] = useState({});
    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "75%", alignSelf: "center" }}>
                <Input
                    label="Hora"
                    placeholder="00"
                    keyboardType="numeric"
                    onChange={(e) => {
                        console.log("Hora: ", e.nativeEvent.text);
                        setDateTIme({
                            ...dateTime,
                            hrs: e.nativeEvent.text
                        });
                    }}
                    containerStyle={{width: "50%", alignSelf: "center"}}
                    inputStyle={{textAlign: "center"}}
                    labelStyle={{textAlign: "center"}}
                />
                <Input 
                    label="Minutos"
                    placeholder="00"
                    keyboardType="numeric"
                    onChange={(e) => {
                        console.log("Hora: ", e.nativeEvent.text);
                        setDateTIme({
                            ...dateTime,
                            mins: e.nativeEvent.text
                        });
                    }}
                    containerStyle={{width: "50%", alignSelf: "center"}}
                    inputStyle={{textAlign: "center"}}
                    labelStyle={{textAlign: "center"}}
                />
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
})
