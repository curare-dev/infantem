import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements';
import { updateDiaper } from '../../../services/diaper/diaper.service';
import { getColor } from '../../../utils/colors';

const EditDiaper = ({setReloadWeekly, setModalVisible, data, setModalVisibleWeek, setReloadData}) => {

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
        updateDiaper(formData).then( response => {
            if(response){
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
            <Input 
                label="Cantidad"
                keyboardType="numeric"
                onChange={(e) => {
                    setFormData({ ...formData, quantity: e.nativeEvent.text });
                }}                     
                errorStyle={styles.errorStyle}
                errorMessage={error}
            /> 
            <Button buttonStyle={styles.buttonStyle} title="Editar" onPress={submitEdit} />
        </View>
    )
}

export default EditDiaper

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
})
