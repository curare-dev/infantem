import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { getDreaming } from "../../services/dreaming/dreaming.service";
import Modal from "../../shared/Modal";
import DreamingWeekly from "./DreamingComponents/DreamingWeekly";

const DreamingMonthly = ({
  reloadData,
  setReloadData,
  setBottomSheetVisible,
}) => {
  const [showData, setShowData] = useState(null);
  const [type, setType] = useState({ type: "month" });
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [weekOneData, setWeekOneData] = useState(null);
  const [weekTwoData, setWeekTwoData] = useState(null);
  const [weekThreeData, setWeekThreeData] = useState(null);
  const [weekFourData, setWeekFourData] = useState(null);
  let objOne = [];
  let objTwo = [];
  let objThree = [];
  let objFour = [];
  const [totalDreaming, setTotalDreaming] = useState({
    weekOne: "",
    weekTwo: "",
    weekThree: "",
    weekFour: "",
  });
  useEffect(() => {
    let drWeekOne = 0;
    let drWeekTwo = 0;
    let drWeekThree = 0;
    let drWeekFour = 0;
    async function fetchDreamingByDay() {
      setReloadData(false);
      getDreaming(type)
        .then((response) => {
          if (response.length === 0) {
            setError("Sube los datos de tu bebe para que se muestren aquí!");
          } else {
            setShowData(
              response.map((l, i) => {
                let date = new Date(l.date);
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                if (day >= 1 && day <= 7 && l.dreamingType === "Secs") {
                  drWeekOne += l.quantity;
                  objOne.push({
                    cantidad: l.quantity,
                    tipo: l.dreamingType,
                    fecha: date,
                  });
                } else if (day >= 8 && day <= 15 && l.dreamingType === "Secs") {
                  drWeekTwo += l.quantity;
                  objTwo.push({
                    cantidad: l.quantity,
                    tipo: l.dreamingType,
                    fecha: date,
                  });
                } else if (
                  day >= 16 &&
                  day <= 23 &&
                  l.dreamingType === "Secs"
                ) {
                  drWeekThree += l.quantity;
                  objThree.push({
                    cantidad: l.quantity,
                    tipo: l.dreamingType,
                    fecha: date,
                  });
                } else if (
                  day >= 24 &&
                  day <= 31 &&
                  l.dreamingType === "Secs"
                ) {
                  drWeekFour += l.quantity;
                  objFour.push({
                    cantidad: l.quantity,
                    tipo: l.dreamingType,
                    fecha: date,
                  });
                }
                day < 10 ? (day = `0${day}`) : day;
                month < 10 ? (month = `0${month}`) : month;
              })
            );
          }
          setTotalDreaming({
            weekOne: drWeekOne,
            weekTwo: drWeekTwo,
            weekThree: drWeekThree,
            weekFour: drWeekFour,
          });
          setWeekOneData(objOne);
          setWeekTwoData(objTwo);
          setWeekThreeData(objThree);
          setWeekFourData(objFour);
        })
        .catch((error) => console.log("Error", error));
    }
    fetchDreamingByDay();
  }, [reloadData]);

  const openList = (week) => {
    switch (week) {
      case 1:
        setModalVisible(true);
        setRenderComponent(<DreamingWeekly data={weekOneData} />);
        break;
      case 2:
        setModalVisible(true);
        setRenderComponent(<DreamingWeekly data={weekTwoData} />);
        break;
      case 3:
        setModalVisible(true);
        setRenderComponent(<DreamingWeekly data={weekThreeData} />);
        break;
      case 4:
        setModalVisible(true);
        setRenderComponent(<DreamingWeekly data={weekFourData} />);
        break;
      case 5:
        setBottomSheetVisible(false);
        break;
      default:
        break;
    }
  };

  const formatedSeconds = (secs) => {
    let d = Number(secs);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    return `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
      s < 10 ? "0" + s : s
    }`;
  };

  return (
    <ScrollView>
      <ListItem onPress={() => openList(1)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Semana 1</ListItem.Title>
          <ListItem.Subtitle>
            Horas de Sueño: {formatedSeconds(totalDreaming.weekOne)}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => openList(2)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Semana 2</ListItem.Title>
          <ListItem.Subtitle>
            Horas de Sueño: {formatedSeconds(totalDreaming.weekTwo)}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => openList(3)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Semana 3</ListItem.Title>
          <ListItem.Subtitle>
            Horas de Sueño: {formatedSeconds(totalDreaming.weekThree)}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => openList(4)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Semana 4</ListItem.Title>
          <ListItem.Subtitle>
            Horas de Sueño: {formatedSeconds(totalDreaming.weekFour)}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <Button
        buttonStyle={styles.closeBottomSheet}
        title="Cerrar"
        onPress={() => openList(5)}
      />
      <Modal isVisible={modalVisible} setIsVisible={setModalVisible}>
        {renderComponent}
      </Modal>
    </ScrollView>
  );
};

export default DreamingMonthly;

const styles = StyleSheet.create({});
