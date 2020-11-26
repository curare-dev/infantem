import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "../../../shared/Modal";
import DeleteFeeding from "./DeleteFeeding";
import EditFeeding from "./EditFeeding";

const FeedingWeekly = ({ setReloadMonthly, data, setBottomSheetVisible, setModalVisible, setReloadData }) => {
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

  const formatTitle = (type, quantity) => {
    if (type === "oz") {
      return `${quantity} Onzas`;
    } else if (type === "ml") {
      return `${quantity} Mililitros`;
    } else if (type === "Secs") {
      let d = Number(quantity);
      const h = Math.floor(d / 3600);
      const m = Math.floor((d % 3600) / 60);
      const s = Math.floor((d % 3600) % 60);
      return `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
        s < 10 ? "0" + s : s
      }`;
    }
  };

  const editDreaming = (data) => {
    setModalVisibleWeek(true);
    setRenderComponent(
      <EditFeeding
        setReloadWeekly={setReloadWeekly}
        setReloadMonthly={setReloadMonthly}
        setModalVisibleWeek={setModalVisibleWeek}
        setBottomSheetVisible={setBottomSheetVisible}
        setModalVisible={setModalVisible}
        setReloadData={setReloadData}
        data={data}
      />
    );
  }

  const deleteDreaming = (id) => {
    setModalVisibleWeek(true);
    setRenderComponent(
      <DeleteFeeding
        setReloadMonthly={setReloadMonthly}
        setReloadWeekly={setReloadWeekly}
        setModalVisibleWeek={setModalVisibleWeek}
        setModalVisible={setModalVisible}
        setReloadData={setReloadData}
        data={id}
      />
    );
  }

  useEffect(() => {
    console.log("Se recarga Weekly");
    setReloadWeekly(false);
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
              <ListItem.Title>{formatTitle(l.feedingType, l.quantity)}</ListItem.Title>
              <ListItem.Subtitle>{`${dayName} ${day} de ${month} ${year}`}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon   
            name='pencil'
            type='material-community'
            size={20}
            onPress={()=>editDreaming(l)}
            />
            <Icon   
            name='delete'
            type='material-community'
            size={20}
            onPress={()=>deleteDreaming(l)}
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
  );
};

export default FeedingWeekly;

const styles = StyleSheet.create({});
