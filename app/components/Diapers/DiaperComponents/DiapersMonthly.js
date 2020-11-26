import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { getDiapers } from "../../../services/diaper/diaper.service";
import Modal from "../../../shared/Modal";
import { getColor } from "../../../utils/colors";
import DiapersWeekly from "./DiapersWeekly";

const DiapersMonthly = ({ setReloadData, setBottomSheetVisible,}) => {

  const [showData, setShowData] = useState(null);
  const [type, setType] = useState({ type: "month" });
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [weekOneData, setWeekOneData] = useState(null);
  const [weekTwoData, setWeekTwoData] = useState(null);
  const [weekThreeData, setWeekThreeData] = useState(null);
  const [weekFourData, setWeekFourData] = useState(null);
  const [reloadMonthly, setReloadMonthly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [textDate, setTextDate] = useState({});
  let objOne = [];
  let objTwo = [];
  let objThree = [];
  let objFour = [];
  const [totalPee, setTotalPee] = useState({
    weekOne: "",
    weekTwo: "",
    weekThree: "",
    weekFour: "",
  });
  const [totalPoo, setTotalPoo] = useState({
    weekOne: "",
    weekTwo: "",
    weekThree: "",
    weekFour: "",
  });
  const [totalMixed, setTotalMixed] = useState({
    weekOne: "",
    weekTwo: "",
    weekThree: "",
    weekFour: "",
  });

  useEffect(() => {
    console.log("Se recarga Monthly");
    let peeWeekOne = 0;
    let peeWeekTwo = 0;
    let peeWeekThree = 0;
    let peeWeekFour = 0;
    let pooWeekOne = 0;
    let pooWeekTwo = 0;
    let pooWeekThree = 0;
    let pooWeekFour = 0;
    let mixedWeekOne = 0;
    let mixedWeekTwo = 0;
    let mixedWeekThree = 0;
    let mixedWeekFour = 0;
    setReloadMonthly(false);
    async function fetchDiaperByDay() {
      getDiapers(type)
        .then((response) => {
          if (response.length === 0) {
            setError("Sube los datos de tu bebe para que se muestren aquí!");
          } else {
            setShowData(
              response.map((l, i) => {
                const months = [
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                  "Agosto",
                  "Septiembre",
                  "Octubre",
                  "Noviembre",
                  "Diciembre",
                ];
                let date = new Date(l.date);
                let year = date.getFullYear();
                let month = months[date.getMonth()];
                let day = date.getDate();
                setTextDate({
                  weekOne: `1 - 7 ${month} ${year}`,
                  weekTwo: `8 - 15 ${month} ${year}`,
                  weekThree: `16 - 23 ${month} ${year}`,
                  weekFour: `24 - 31 ${month} ${year}`,
                });
                if (day >= 1 && day <= 7 && l.diaperType === "pee") {
                  peeWeekOne += l.quantity;
                  objOne.push(l);
                } else if (day >= 8 && day <= 15 && l.diaperType === "pee") {
                  peeWeekTwo += l.quantity;
                  objTwo.push(l);
                } else if (day >= 16 && day <= 23 && l.diaperType === "pee") {
                  peeWeekThree += l.quantity;
                  objThree.push(l);
                } else if (day >= 24 && day <= 31 && l.diaperType === "pee") {
                  peeWeekFour += l.quantity;
                  objFour.push(l);
                } else if (day >= 1 && day <= 7 && l.diaperType === "poo") {
                  pooWeekOne += l.quantity;
                  objOne.push(l);
                } else if (day >= 8 && day <= 15 && l.diaperType === "poo") {
                  pooWeekTwo += l.quantity;
                  objTwo.push(l);
                } else if (day >= 16 && day <= 23 && l.diaperType === "poo") {
                  pooWeekThree += l.quantity;
                  objThree.push(l);
                } else if (day >= 24 && day <= 31 && l.diaperType === "poo") {
                  pooWeekFour += l.quantity;
                  objFour.push(l);
                } else if (day >= 1 && day <= 7 && l.diaperType === "mixed") {
                  mixedWeekOne += l.quantity;
                  objOne.push(l);
                } else if (day >= 8 && day <= 15 && l.diaperType === "mixed") {
                  mixedWeekTwo += l.quantity;
                  objTwo.push(l);
                } else if (day >= 16 && day <= 23 && l.diaperType === "mixed") {
                  mixedWeekThree += l.quantity;
                  objThree.push(l);
                } else if (day >= 24 && day <= 31 && l.diaperType === "mixed") {
                  mixedWeekFour += l.quantity;
                  objFour.push(l);
                }
                day < 10 ? (day = `0${day}`) : day;
                month < 10 ? (month = `0${month}`) : month;
                setIsLoading(false);
              })
            );
          }
          setTotalPee({
            weekOne: peeWeekOne,
            weekTwo: peeWeekTwo,
            weekThree: peeWeekThree,
            weekFour: peeWeekFour,
          });
          setTotalPoo({
            weekOne: pooWeekOne,
            weekTwo: pooWeekTwo,
            weekThree: pooWeekThree,
            weekFour: pooWeekFour,
          });
          setTotalMixed({
            weekOne: mixedWeekOne,
            weekTwo: mixedWeekTwo,
            weekThree: mixedWeekThree,
            weekFour: mixedWeekFour,
          });
          setWeekOneData(objOne);
          setWeekTwoData(objTwo);
          setWeekThreeData(objThree);
          setWeekFourData(objFour);
        })
        .catch((error) => console.log("Error", error));
    }
    fetchDiaperByDay();
  }, [reloadMonthly]);

  const openList = (week) => {
    switch (week) {
      case 1:
        setModalVisible(true);
        setRenderComponent(<DiapersWeekly 
                              data={weekOneData} 
                              setReloadMonthly={setReloadMonthly} 
                              setBottomSheetVisible={setBottomSheetVisible} 
                              setModalVisible={setModalVisible}
                              setReloadData={setReloadData}
                            />);
        break;
      case 2:
        setModalVisible(true);
        setRenderComponent(<DiapersWeekly 
                              data={weekTwoData} 
                              setReloadMonthly={setReloadMonthly} 
                              setBottomSheetVisible={setBottomSheetVisible} 
                              setModalVisible={setModalVisible}
                              setReloadData={setReloadData}
                            />);
        break;
      case 3:
        setModalVisible(true);
        setRenderComponent(<DiapersWeekly 
                              data={weekThreeData} 
                              setReloadMonthly={setReloadMonthly} 
                              setBottomSheetVisible={setBottomSheetVisible}
                              setModalVisible={setModalVisible}
                              setReloadData={setReloadData}
                            />);
        break;
      case 4:
        setModalVisible(true);
        setRenderComponent(<DiapersWeekly
                              data={weekFourData} 
                              setReloadMonthly={setReloadMonthly} 
                              setBottomSheetVisible={setBottomSheetVisible}
                              setModalVisible={setModalVisible}
                              setReloadData={setReloadData}
                            />);
        break;
      case 5:
        setBottomSheetVisible(false);
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView>
      {isLoading ? 
      <View>
        <ListItem>
          <ListItem.Content style={styles.activityIndicator}>
            <ActivityIndicator size="large" color={getColor("backgroundColor")} /> 
          </ListItem.Content>
        </ListItem>
      </View>
      :
      <View>
      <ListItem onPress={() => openList(1)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{textDate.weekOne}</ListItem.Title>
          <ListItem.Subtitle>Pipi: {totalPee.weekOne}</ListItem.Subtitle>
          <ListItem.Subtitle>Popo: {totalPoo.weekOne}</ListItem.Subtitle>
          <ListItem.Subtitle>Mixto: {totalMixed.weekOne}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => openList(2)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{textDate.weekTwo}</ListItem.Title>
          <ListItem.Subtitle>Pipi: {totalPee.weekTwo}</ListItem.Subtitle>
          <ListItem.Subtitle>Popo: {totalPoo.weekTwo}</ListItem.Subtitle>
          <ListItem.Subtitle>Mixto: {totalMixed.weekTwo}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => openList(3)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{textDate.weekThree}</ListItem.Title>
          <ListItem.Subtitle>Pipi: {totalPee.weekThree}</ListItem.Subtitle>
          <ListItem.Subtitle>Popo: {totalPoo.weekThree}</ListItem.Subtitle>
          <ListItem.Subtitle>Mixto: {totalMixed.weekThree}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => openList(4)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{textDate.weekFour}</ListItem.Title>
          <ListItem.Subtitle>Pipi: {totalPee.weekFour}</ListItem.Subtitle>
          <ListItem.Subtitle>Popo: {totalPoo.weekFour}</ListItem.Subtitle>
          <ListItem.Subtitle>Mixto: {totalMixed.weekFour}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      </View>
      }
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

export default DiapersMonthly;

const styles = StyleSheet.create({
  closeBottomSheet: {
    backgroundColor: getColor("buttonColor"),
  },
  activityIndicator: {
    height: 225,
    alignItems: "center"
  }
});
