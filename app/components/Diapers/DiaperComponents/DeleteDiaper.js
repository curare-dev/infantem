import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { deleteDiaper } from '../../../services/diaper/diaper.service'
import { getColor } from '../../../utils/colors'

const DeleteDiaper = ({setReloadWeekly, setModalVisible, data, setModalVisibleWeek, setReloadData, setReloadMonthly}) => {
    const submitDelete = async () => {
        await deleteDiaper(data._id).then( response => {
            Alert.alert("Exitoso!", "Se eliminó el registro");
            console.log("RESPONSE DELETE DREAMING: ", response);
            setReloadWeekly(true);
            setReloadMonthly(true);
            setModalVisibleWeek(false);
            setModalVisible(false);
            setReloadData(true);
        } ).catch( error => {
            console.log("ERROR EN DELETE FEEDING: ", error);
            setReloadData(true);
            Alert.alert("Alerta!", "Error al Eliminar");
        });
    }
    return (
        <View>
            <Text style={styles.text}>¿Desea eliminar el registro?</Text>
            <Button buttonStyle={styles.buttonStyle} title="Eliminar" onPress={submitDelete} /> 
        </View>
    )
}

export default DeleteDiaper

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
      text: {
          textAlign: "center",
          textAlignVertical: "center",
          marginBottom: "3%",
      }
})
