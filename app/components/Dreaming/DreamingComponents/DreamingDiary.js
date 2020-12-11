import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { getDreaming } from "../../../services/dreaming/dreaming.service";
import { formatedUTCDate, formatedDreamingTitle } from "../../../shared/FormatedDate";
import { getColor } from "../../../utils/colors";

const DreamingDiary = ({ reloadData, setReloadData }) => {
  
  const [showData, setShowData] = useState(null);
  const [type, setType] = useState({ type: "day" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchDreamingByDay() {
    setReloadData(false);
    getDreaming(type)
      .then((response) => {
        if (response.length === 0) {
          setError("Sube los datos de tu bebe para que se muestren aquí!");
          setIsLoading(false);
        } else {
          setShowData(
            response.map((l, i) => {
              setIsLoading(false);
              return (
                <ListItem
                  key={i}
                  containerStyle={styles.listItemContainerStyle}
                >
                  <ListItem.Content>
                    <ListItem.Title>{formatedDreamingTitle(l.dreamingType, l.quantity)}</ListItem.Title>
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
    fetchDreamingByDay();
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

export default DreamingDiary;

const styles = StyleSheet.create({
  listItemContainerStyle: {
    marginBottom: "1%",
  },
  noDataText: {
    textAlign: "center",
  },
});
