import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { getDreaming } from "../../services/dreaming/dreaming.service";
import Modal from "../../shared/Modal";
import { getColor } from "../../utils/colors";
import DreamingWeekly from "./DreamingComponents/DreamingWeekly";

const DreamingMonthly = ({
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
  const [isLoading, setIsLoading] = useState(false);
  const [textDate, setTextDate] = useState({});

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
    setIsLoading(true);
    async function fetchDreamingByDay() {
      setReloadMonthly(false);
      setReloadData(false);
      getDreaming(type)
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
                if (day >= 1 && day <= 7 && l.dreamingType === "Secs") {
                  drWeekOne += l.quantity;
                  objOne.push(
                    l
                  );
                } else if (day >= 8 && day <= 15 && l.dreamingType === "Secs") {
                  drWeekTwo += l.quantity;
                  objTwo.push(l);
                } else if (
                  day >= 16 &&
                  day <= 23 &&
                  l.dreamingType === "Secs"
                ) {
                  drWeekThree += l.quantity;
                  objThree.push(l);
                } else if (
                  day >= 24 &&
                  day <= 31 &&
                  l.dreamingType === "Secs"
                ) {
                  drWeekFour += l.quantity;
                  objFour.push(l);
                }
                day < 10 ? (day = `0${day}`) : day;
                month < 10 ? (month = `0${month}`) : month;
                setIsLoading(false);
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
  }, [reloadMonthly]);

  const openList = (week) => {
    switch (week) {
      case 1:
        setModalVisible(true);
        setRenderComponent(<DreamingWeekly 
          data={weekOneData}
          setReloadMonthly={setReloadMonthly} 
          setBottomSheetVisible={setBottomSheetVisible} 
          setModalVisible={setModalVisible}
          setReloadData={setReloadData}
         />);
        break;
      case 2:
        setModalVisible(true);
        setRenderComponent(<DreamingWeekly 
          data={weekTwoData} 
          setReloadMonthly={setReloadMonthly} 
          setBottomSheetVisible={setBottomSheetVisible} 
          setModalVisible={setModalVisible}
          setReloadData={setReloadData}
        />);
        break;
      case 3:
        setModalVisible(true);
        setRenderComponent(<DreamingWeekly 
          data={weekThreeData} 
          setReloadMonthly={setReloadMonthly} 
          setBottomSheetVisible={setBottomSheetVisible} 
          setModalVisible={setModalVisible}
          setReloadData={setReloadData}
        />);
        break;
      case 4:
        setModalVisible(true);
        setRenderComponent(<DreamingWeekly 
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
          <ListItem.Subtitle>
            Horas de Sueño: {formatedSeconds(totalDreaming.weekOne)}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => openList(2)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{textDate.weekTwo}</ListItem.Title>
          <ListItem.Subtitle>
            Horas de Sueño: {formatedSeconds(totalDreaming.weekTwo)}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => openList(3)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{textDate.weekThree}</ListItem.Title>
          <ListItem.Subtitle>
            Horas de Sueño: {formatedSeconds(totalDreaming.weekThree)}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => openList(4)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{textDate.weekFour}</ListItem.Title>
          <ListItem.Subtitle>
            Horas de Sueño: {formatedSeconds(totalDreaming.weekFour)}
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

export default DreamingMonthly;

const styles = StyleSheet.create({
  closeBottomSheet: {
    backgroundColor: getColor("buttonColor"),
  },
  activityIndicator: {
    height: 225,
    alignItems: "center"
  }
});
