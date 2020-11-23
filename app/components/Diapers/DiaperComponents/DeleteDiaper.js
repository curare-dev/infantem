import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { deleteDiaper } from '../../../services/diaper/diaper.service'
import { getColor } from '../../../utils/colors'

const DeleteDiaper = ({setReloadWeekly, setModalVisible, data, setModalVisibleWeek, setReloadData}) => {
    const submitDelete = async () => {
        await deleteDiaper(data._id).then( response => {
            setReloadWeekly(true);
                setModalVisibleWeek(false);
                setModalVisible(false);
                setReloadData(true);
        } ).catch( error => {
            setReloadData(true);
            console.log("Error al eliminar");
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