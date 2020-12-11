import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from "react-native-elements";
import { updateFeeding } from '../../../services/feeding/feeding.service';
import { getColor } from '../../../utils/colors';


const EditFeeding = ({setReloadWeekly, setModalVisible, data, setModalVisibleWeek, setReloadData, setReloadMonthly}) => {
    const [formData, setFormData] = useState(data);
    let [mins, setMins] = useState(null);
    let [hrs, setHrs] = useState(null);
    const [error, setError] = useState("");

    const submitEdit = () => {
        if(hrs || mins){
            hrs ? hrs  : hrs = 0;
            mins ? mins : mins = 0;
            formData.quantity = hrs + mins;
        } 
        updateFeeding(formData).then( response => {
            if(response){
                setReloadWeekly(true);
                setReloadMonthly(true);
                setModalVisibleWeek(false);
                setModalVisible(false);
                setReloadData(true);
            } else {
                setError("Error en el servicio");
            }
        }).catch( error => {
            console.log("Error", error);
        });
    }

    return (
        <View style={styles.viewContainer}>
            { data.feedingType === "Secs" ? 
            <View style={styles.secViewInput}>
                <Input 
                    style={styles.input} 
                    label="Hrs"
                    keyboardType="numeric"
                    onChange={(e) => {
                        let hrsInput = e.nativeEvent.text * 3600
                        setHrs(hrsInput);
                    }} 
                    placeholder="00"
                />
                <Input 
                    style={styles.input} 
                    label="Mins" 
                    keyboardType="numeric"
                    onChange={(e) => {
                        let minsInput =  e.nativeEvent.text * 60
                        setMins(minsInput);
                    }} 
                    placeholder="00"
                /> 
            </View>
            : 
            <View style={styles.inputOzMl} >
                <Input 
                    label="Cantidad"
                    keyboardType="numeric"
                    onChange={(e) => {
                        setFormData({ ...formData, quantity: e.nativeEvent.text });
                    }} 
                    errorStyle={styles.errorStyle}
                    errorMessage={error}
                /> 
            </View>

            }
            <Button buttonStyle={styles.buttonStyle} title="Editar" onPress={submitEdit} />
        </View>
    )
}

export default EditFeeding;

const styles = StyleSheet.create({
    buttonStyle: {
        alignSelf: "center",
        backgroundColor: getColor("buttonColor"),
        width: "90%",
      },
      errorStyle: {
        marginTop: "3%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15,
        color: "red",
      },
    secViewInput:{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "30%",
    },
    viewContainer: {
        alignSelf: "center"
    },
})
