import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getFeeding } from "../../services/feeding/feeding.service";
import { ListItem, Avatar } from "react-native-elements";

const FeedingDiary = ({ reloadData, setReloadData }) => {
  console.log(setReloadData);
  const [showData, setShowData] = useState(null);
  const [type, setType] = useState({ type: "day" });
  useEffect(() => {
    async function fetchFeedingByDay() {
      setReloadData(false);
      getFeeding(type)
        .then((response) => {
          if (response.length === 0) {
            setError("No hay datos que mostrar");
          } else {
            setShowData(
              response.map((l, i) => {
                let date = new Date(l.date);
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                month < 10 ? (month = `0${month}`) : month;
                let day = date.getDate();
                day < 10 ? (day = `0${day}`) : day;
                return (
                  <ListItem
                    key={i}
                    containerStyle={styles.listItemContainerStyle}
                  >
                    <ListItem.Content>
                      <ListItem.Title>
                        {l.quantity} {l.feedingType}
                      </ListItem.Title>
                      <ListItem.Subtitle>{`${day}/${month}/${year}`}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                );
              })
            );
          }
        })
        .catch((error) => console.log("Error", error));
    }
    fetchFeedingByDay();
  }, [reloadData]);
  return <ScrollView>{showData}</ScrollView>;
};

export default FeedingDiary;

const styles = StyleSheet.create({
  listItemContainerStyle: {
    marginBottom: "1%",
  },
});