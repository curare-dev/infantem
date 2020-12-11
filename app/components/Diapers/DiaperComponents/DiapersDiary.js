import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { getDiapers } from "../../../services/diaper/diaper.service";
import { getColor } from "../../../utils/colors";

const DiapersDiary = ({ reloadData, setReloadData }) => {
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
    if (type === "pee") {
      return `${quantity} de Pipi`;
    } else if (type === "poo") {
      return `${quantity} de Popo`;
    } else if (type === "mixed") {
      return `${quantity} Mixto`
    }
  };

  useEffect(() => {
    setIsLoading(true);
    async function fetchDiaperByDay() {
      setReloadData(false);
      getDiapers(type)
        .then((response) => {
          if (response.length === 0) {
            setError("Sube los datos de tu bebe para que se muestren aquí!");
            setIsLoading(false);
          } else {
            setShowData(
              response.map((l, i) => {
                let date = new Date(l.date);
                let year = date.getUTCFullYear();
                let month = months[date.getUTCMonth()];
                let day = date.getUTCDate();
                let dayName = days[date.getUTCDay()];
                setIsLoading(false);
                console.log(l);
                return (
                  <ListItem
                    key={i}
                    containerStyle={styles.listItemContainerStyle}
                  >
                    <ListItem.Content>
                      <ListItem.Title>{formatTitle(l.diaperType, l.quantity)}</ListItem.Title>
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
    fetchDiaperByDay();
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

export default DiapersDiary;

const styles = StyleSheet.create({
  listItemContainerStyle: {
    marginBottom: "1%",
  },
  noDataText: {
    textAlign: "center",
  },
});
