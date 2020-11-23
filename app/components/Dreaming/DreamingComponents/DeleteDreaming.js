import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { deleteDreaming } from '../../../services/dreaming/dreaming.service'
import { getColor } from '../../../utils/colors'

const DeleteDreaming = ({setReloadWeekly, setModalVisible, data, setModalVisibleWeek, setReloadData}) => {
    console.log(data);
    const submitDelete = async () => {
        await deleteDreaming(data._id).then( response => {
            console.log(response);
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

export default DeleteDreaming

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