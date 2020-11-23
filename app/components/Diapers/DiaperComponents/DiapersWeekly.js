import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements';
import Modal from '../../../shared/Modal';
import DeleteDiaper from './DeleteDiaper';
import EditDiaper from './EditDiaper';

const DiapersWeekly = ({ setReloadMonthly, data, setBottomSheetVisible, setModalVisible, setReloadData }) => {

    const [modalVisibleWeek, setModalVisibleWeek] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);
    const [renderData, setRenderData] = useState(null);
    const [reloadWeekly, setReloadWeekly] = useState(false);
    const months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];


  const editDiaper = (data) => {
    setModalVisibleWeek(true);
    setRenderComponent(
      <EditDiaper
        setReloadWeekly={setReloadWeekly}
        setModalVisibleWeek={setModalVisibleWeek}
        setBottomSheetVisible={setBottomSheetVisible}
        setModalVisible={setModalVisible}
        setReloadData={setReloadData}
        data={data}
      />
    );
  }

  const deleteDiaper = (id) => {
    setModalVisibleWeek(true);
    setRenderComponent(
      <DeleteDiaper
        setReloadWeekly={setReloadWeekly}
        setModalVisibleWeek={setModalVisibleWeek}
        setModalVisible={setModalVisible}
        setReloadData={setReloadData}
        data={id}
      />
    );
  }

  const formatTitle = (type, quantity) => {
    if (type === "pee") {
      return `${quantity} de Pipi`;
    } else if (type === "poo") {
      return `${quantity} de Popo`;
    } else if (type === "mixed") {
      return `${quantity} Mixto`;
    }
  };

  useEffect(() => {
    console.log("Se recarga Weekly");
    setReloadWeekly(false);
    setReloadMonthly(true);
    setRenderData(
      data.map((l, i) => {
        let date = new Date(l.date);
        let year = date.getFullYear();
        let month = months[date.getMonth()];
        let day = date.getDate();
        let dayName = days[date.getDay()];
        return (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{formatTitle(l.diaperType, l.quantity)}</ListItem.Title>
              <ListItem.Subtitle>{`${dayName} ${day} de ${month} ${year}`}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon   
            name='pencil'
            type='material-community'
            size={20}
            onPress={()=>editDiaper(l)}
            />
            <Icon   
            name='delete'
            type='material-community'
            size={20}
            onPress={()=>deleteDiaper(l)}
            />
          </ListItem>
        );
      })
    );
  }, [reloadWeekly])

    return (
        <ScrollView>
        {renderData}
        <Modal isVisible={modalVisibleWeek} setIsVisible={setModalVisibleWeek}>
          {renderComponent}
        </Modal>
      </ScrollView>
    )
}

export default DiapersWeekly

const styles = StyleSheet.create({})
