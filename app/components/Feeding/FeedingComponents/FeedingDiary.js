import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { getFeeding } from "../../../services/feeding/feeding.service";
import { getColor } from "../../../utils/colors";

const FeedingDiary = ({ reloadData, setReloadData }) => {
  const [showData, setShowData] = useState(null);
  const [type, setType] = useState({ type: "day" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    setIsLoading(true);
    async function fetchFeedingByDay() {
      setReloadData(false);
      getFeeding(type)
        .then((response) => {
          if (response.length === 0) {
            setError("Sube los datos de tu bebe para que se muestren aquí!");
            setIsLoading(false);
          } else {
            setShowData(
              response.map((l, i) => {
                let date = new Date(l.date);
                let year = date.getFullYear();
                let month = months[date.getMonth()];
                let day = date.getDate();
                let dayName = days[date.getDay()];
                setIsLoading(false);
                return (
                  <ListItem
                    key={i}
                    containerStyle={styles.listItemContainerStyle}
                  >
                    <ListItem.Content>
                      <ListItem.Title>{formatTitle(l.feedingType, l.quantity)}</ListItem.Title>
                      <ListItem.Subtitle>{`${dayName} ${day} de ${month} ${year}`}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                );
              })
            );
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("Error", error);
        });
    }
    fetchFeedingByDay();
  }, [reloadData]);

  return (
    <ScrollView>
      { isLoading ? 
        <ActivityIndicator size="large" color={getColor("backgroundColor")} /> 
       : showData ? showData : 
        <Text style={styles.noDataText}>{error}</Text> }
    </ScrollView>
  );
};

export default FeedingDiary;

const styles = StyleSheet.create({
  listItemContainerStyle: {
    marginBottom: "1%",
  },
  noDataText: {
    textAlign: "center",
  },
});
