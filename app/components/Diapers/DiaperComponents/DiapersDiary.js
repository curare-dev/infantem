import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { getDiapers } from "../../../services/diaper/diaper.service";
import { formatedDiapersTitle, formatedUTCDate } from "../../../shared/FormatedDate";
import { getColor } from "../../../utils/colors";

const DiapersDiary = ({ reloadData, setReloadData }) => {
  const [showData, setShowData] = useState(null);
  const [type, setType] = useState({ type: "day" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchDiaperByDay = async () =>{
    setReloadData(false);
    await getDiapers(type)
      .then((response) => {
        if (response.length === 0) {
          setError("Sube los datos de tu bebe para que se muestren aquí!");
          setIsLoading(false);
        } else {
          setShowData(
            response.map((l, i) => {
              setIsLoading(false);
              console.log(l);
              return (
                <ListItem
                  key={i}
                  containerStyle={styles.listItemContainerStyle}
                >
                  <ListItem.Content>
                    <ListItem.Title>{formatedDiapersTitle(l.diaperType, l.quantity)}</ListItem.Title>
                    <ListItem.Subtitle>{formatedUTCDate(l)}</ListItem.Subtitle>
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

  useEffect(() => {
    setIsLoading(true);
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
