import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { getFeeding } from "../../../services/feeding/feeding.service";
import Modal from "../../../shared/Modal";
import { getColor } from "../../../utils/colors";
import FeedingWeekly from "./FeedingWeekly";

const FeedingMonthly = ({
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
  const [reloadMonthly, setReloadMonthly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [textDate, setTextDate] = useState({});
  let objOne = [];
  let objTwo = [];
  let objThree = [];
  let objFour = [];
  const [totalOz, setTotalOz] = useState({
    weekOne: "",
    weekTwo: "",
    weekThree: "",
    weekFour: "",
  });
  const [totalMl, setTotalMl] = useState({
    weekOne: "",
    weekTwo: "",
    weekThree: "",
    weekFour: "",
  });
  const [totalBf, setTotalBf] = useState({
    weekOne: "",
    weekTwo: "",
    weekThree: "",
    weekFour: "",
  });
  
  useEffect(() => {
    console.log("Se recarga Monthly");
    let ozWeekOne = 0;
    let ozWeekTwo = 0;
    let ozWeekThree = 0;
    let ozWeekFour = 0;
    let mlWeekOne = 0;
    let mlWeekTwo = 0;
    let mlWeekThree = 0;
    let mlWeekFour = 0;
    let bfWeekOne = 0;
    let bfWeekTwo = 0;
    let bfWeekThree = 0;
    let bfWeekFour = 0;
    setReloadMonthly(false);
    async function fetchFeedingByDay() {
      getFeeding(type)
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
                if (day >= 1 && day <= 7 && l.feedingType === "oz") {
                  ozWeekOne += l.quantity;
                  objOne.push(l);
                } else if (day >= 8 && day <= 15 && l.feedingType === "oz") {
                  ozWeekTwo += l.quantity;
                  objTwo.push(l);
                } else if (day >= 16 && day <= 23 && l.feedingType === "oz") {
                  ozWeekThree += l.quantity;
                  objThree.push(l);
                } else if (day >= 24 && day <= 31 && l.feedingType === "oz") {
                  ozWeekFour += l.quantity;
                  objFour.push(l);
                } else if (day >= 1 && day <= 7 && l.feedingType === "ml") {
                  mlWeekOne += l.quantity;
                  objOne.push(l);
                } else if (day >= 8 && day <= 15 && l.feedingType === "ml") {
                  mlWeekTwo += l.quantity;
                  objTwo.push(l);
                } else if (day >= 16 && day <= 23 && l.feedingType === "ml") {
                  mlWeekThree += l.quantity;
                  objThree.push(l);
                } else if (day >= 24 && day <= 31 && l.feedingType === "ml") {
                  mlWeekFour += l.quantity;
                  objFour.push(l);
                } else if (day >= 1 && day <= 7 && l.feedingType === "Secs") {
                  bfWeekOne += l.quantity;
                  objOne.push(l);
                } else if (day >= 8 && day <= 15 && l.feedingType === "Secs") {
                  bfWeekTwo += l.quantity;
                  objTwo.push(l);
                } else if (day >= 16 && day <= 23 && l.feedingType === "Secs") {
                  bfWeekThree += l.quantity;
                  objThree.push(l);
                } else if (day >= 24 && day <= 31 && l.feedingType === "Secs") {
                  bfWeekFour += l.quantity;
                  objFour.push(l);
                }
                day < 10 ? (day = `0${day}`) : day;
                month < 10 ? (month = `0${month}`) : month;
                setIsLoading(false);
              })
            );
          }
          setTotalOz({
            weekOne: ozWeekOne,
            weekTwo: ozWeekTwo,
            weekThree: ozWeekThree,
            weekFour: ozWeekFour,
          });
          setTotalMl({
            weekOne: mlWeekOne,
            weekTwo: mlWeekTwo,
            weekThree: mlWeekThree,
            weekFour: mlWeekFour,
          });
          setTotalBf({
            weekOne: bfWeekOne,
            weekTwo: bfWeekTwo,
            weekThree: bfWeekThree,
            weekFour: bfWeekFour,
          });
          setWeekOneData(objOne);
          setWeekTwoData(objTwo);
          setWeekThreeData(objThree);
          setWeekFourData(objFour);
        })
        .catch((error) => console.log("Error", error));
    }
    fetchFeedingByDay();
  }, [reloadMonthly]);

  const openList = (week) => {
    switch (week) {
      case 1:
        setModalVisible(true);
        setRenderComponent(<FeedingWeekly 
                              data={weekOneData} 
                              setReloadMonthly={setReloadMonthly} 
                              setBottomSheetVisible={setBottomSheetVisible} 
                              setModalVisible={setModalVisible}
                              setReloadData={setReloadData}
                            />);
        break;
      case 2:
        setModalVisible(true);
        setRenderComponent(<FeedingWeekly 
                              data={weekTwoData} 
                              setReloadMonthly={setReloadMonthly} 
                              setBottomSheetVisible={setBottomSheetVisible} 
                              setModalVisible={setModalVisible}
                              setReloadData={setReloadData}
                            />);
        break;
      case 3:
        setModalVisible(true);
        setRenderComponent(<FeedingWeekly 
                              data={weekThreeData} 
                              setReloadMonthly={setReloadMonthly} 
                              setBottomSheetVisible={setBottomSheetVisible}
                              setModalVisible={setModalVisible}
                              setReloadData={setReloadData}
                            />);
        break;
      case 4:
        setModalVisible(true);
        setRenderComponent(<FeedingWeekly 
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
          <ListItem.Subtitle>Onzas: {totalOz.weekOne}</ListItem.Subtitle>
          <ListItem.Subtitle>Mililitros: {totalMl.weekOne}</ListItem.Subtitle>
          <ListItem.Subtitle>
            Leche Materna: {formatedSeconds(totalBf.weekOne)}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => openList(2)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{textDate.weekTwo}</ListItem.Title>
          <ListItem.Subtitle>Onzas: {totalOz.weekTwo}</ListItem.Subtitle>
          <ListItem.Subtitle>Mililitros: {totalMl.weekTwo}</ListItem.Subtitle>
          <ListItem.Subtitle>
            Leche Materna: {formatedSeconds(totalBf.weekTwo)}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => openList(3)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{textDate.weekThree}</ListItem.Title>
          <ListItem.Subtitle>Onzas: {totalOz.weekThree}</ListItem.Subtitle>
          <ListItem.Subtitle>Mililitros: {totalMl.weekThree}</ListItem.Subtitle>
          <ListItem.Subtitle>
            Leche Materna: {formatedSeconds(totalBf.weekThree)}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => openList(4)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{textDate.weekFour}</ListItem.Title>
          <ListItem.Subtitle>Onzas: {totalOz.weekFour}</ListItem.Subtitle>
          <ListItem.Subtitle>Mililitros: {totalMl.weekFour}</ListItem.Subtitle>
          <ListItem.Subtitle>
            Leche Materna: {formatedSeconds(totalBf.weekFour)}
          </ListItem.Subtitle>
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

export default FeedingMonthly;

const styles = StyleSheet.create({
  closeBottomSheet: {
    backgroundColor: getColor("buttonColor"),
  },
  activityIndicator: {
    height: 225,
    alignItems: "center"
  }
});
