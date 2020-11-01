import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import Modal from "../../../shared/Modal";
import DeleteDreaming from "./DeleteDreaming";
import EditDreaming from "./EditDreaming";

const DreamingWeekly = ({ setReloadMonthly, data, setBottomSheetVisible, setModalVisible, setReloadData }) => {
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

  const formatedSeconds = (secs) => {
    let d = Number(secs);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    return `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
      s < 10 ? "0" + s : s
    }`;
  };

  const editDreaming = data => {
    setModalVisibleWeek(true);
    setRenderComponent(<EditDreaming
      setReloadWeekly={setReloadWeekly}
      setModalVisibleWeek={setModalVisibleWeek}
      setBottomSheetVisible={setBottomSheetVisible}
      setModalVisible={setModalVisible}
      setReloadData={setReloadData}
      data={data}
      />);
  }

  const deleteDreaming = (data) => {
    setModalVisibleWeek(true);
    setRenderComponent(<DeleteDreaming
      setReloadWeekly={setReloadWeekly}
      setModalVisibleWeek={setModalVisibleWeek}
      setModalVisible={setModalVisible}
      setReloadData={setReloadData}
      data={data}
      />);
  }

  useEffect(() => {
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
          <ListItem key={i}>
            <ListItem.Content>
              <ListItem.Title>
                {formatedSeconds(l.quantity)} 
              </ListItem.Title>
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
  }, [reloadWeekly]);

  return (
    <ScrollView>
    {renderData}
    <Modal isVisible={modalVisibleWeek} setIsVisible={setModalVisibleWeek}>
      {renderComponent}
    </Modal>
    </ScrollView>
  );
};

export default DreamingWeekly;

const styles = StyleSheet.create({});
