import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";

const DreamingWeekly = (props) => {
  const [reloadData, setReloadData] = useState(false);
  const [display, setDisplay] = useState("none");
  const [renderData, setRenderData] = useState(null);

  const toggleDisplay = () => {
    if (display === "none") {
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
  };

  let a = props.data.reduce((r, a) => {
    console.log("a: ", a);
    console.log("r: ", r);
  }, {});

  console.log(a);

  useEffect(() => {
    setRenderData(
      props.data.map((l, i) => {
        let day = new Date(l.fecha);
        return (
          <ListItem key={i}>
            <ListItem.Content>
              <ListItem.Title>
                {l.cantidad} {l.tipo}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        );
      })
    );
  }, [reloadData]);

  return <ScrollView>{renderData}</ScrollView>;
};

export default DreamingWeekly;

const styles = StyleSheet.create({});
