import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
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

  return (
    <ScrollView>
      {props.data.map((l, i) => {
        let date = new Date(l.fecha);
        let year = date.getFullYear();
        let month = months[date.getMonth()];
        let day = date.getDate();
        let dayName = days[date.getDay()];
        return (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{formatTitle(l.tipo, l.cantidad)}</ListItem.Title>
              <ListItem.Subtitle>{`${dayName} ${day} de ${month} del ${year}`}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default FeedingWeekly;

const styles = StyleSheet.create({});
