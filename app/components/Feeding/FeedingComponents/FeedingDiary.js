import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { getFeeding } from "../../../services/feeding/feeding.service";
import { formatedDreamingTitle, formatedUTCDate } from "../../../shared/FormatedDate";
import { getColor } from "../../../utils/colors";

const FeedingDiary = ({ reloadData, setReloadData }) => {
  const [showData, setShowData] = useState(null);
  const [type, setType] = useState({ type: "day" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchFeedingByDay = async () => {
    await getFeeding(type)
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
                    <ListItem.Title>{formatedDreamingTitle(l.feedingType, l.quantity)}</ListItem.Title>
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
    setReloadData(false);
    setIsLoading(true);
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
