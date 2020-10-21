import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

const FeedingWeekly = (props) => {
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

  const editDreaming = (id) => {
    console.log("Pushado para editar: ", id);
  }

  const deleteDreaming = (id) => {
    console.log("Pushado para eliminar: ", id);
  }

  return (
    <ScrollView>
      {props.data.map((l, i) => {
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
            onPress={()=>editDreaming(l._id)}
            />
            <Icon   
            name='delete'
            type='material-community'
            size={20}
            onPress={()=>deleteDreaming(l._id)}
            />
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default FeedingWeekly;

const styles = StyleSheet.create({});
