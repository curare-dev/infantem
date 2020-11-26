import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements';
import { updateDreaming } from '../../../services/dreaming/dreaming.service';
import { getColor } from '../../../utils/colors';

const EditDreaming = ({setReloadWeekly, setModalVisible, data, setModalVisibleWeek, setReloadData, setReloadMonthly}) => {
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
        updateDreaming(formData).then( response => {
            if(response){
                setReloadMonthly(true);
                setReloadWeekly(true);
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
            <Button buttonStyle={styles.buttonStyle} title="Editar" onPress={submitEdit} />
        </View>
    )
}

export default EditDreaming

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
