import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Timer from "../../shared/Timer";
import { getColor } from "../../utils/colors";
import DreamingDiaryManual from "./DreamingComponents/DreamingDiaryManual";
import Modal from "../../shared/Modal";
import DreamingDiary from "./DreamingComponents/DreamingDiary";
import DreamingMonthly from "./DreamingComponents/DreamingMonthly";
import { BottomSheet, Button, Divider } from "react-native-elements";
import {
  getTotalDreaming,
  postDreaming,
} from "../../services/dreaming/dreaming.service";
import { validateEmptyForm } from "../../utils/validations";
import Ads, { showAd } from "../../shared/Ads";
import { formatedDate, formatedSeconds } from "../../shared/FormatedDate";

const Dreamings = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const toggleBottomSheet = () => setBottomSheetVisible(!bottomSheetVisible);
  const toggleModal = () => setIsVisible(true);
  const [renderComponent, setRenderComponent] = useState(null);
  const [time, setTime] = useState(null);
  const [resetTimer, setResetTimer] = useState(false);
  const [error, setError] = useState("");
  const [reloadData, setReloadData] = useState(false);
  const [todayDataSecs, setTodayDataSecs] = useState(null);
  const [monthlyDataSecs, setMonthlyDataSecs] = useState(null);
  const [countAd, setCountAd] = useState(0);

  const getComponent = (component) => {
    switch (component) {
      case "manual":
        setRenderComponent(
          <DreamingDiaryManual
            setReloadData={setReloadData}
            setIsVisible={setIsVisible}
          />
        );
        break;
      case "day":
        setRenderComponent(<DreamingDiary setIsVisible={setIsVisible} setReloadData={setReloadData}
          />);
        break;
      case "month":
        setRenderComponent(
          <DreamingMonthly
            setReloadData={setReloadData}
            setBottomSheetVisible={setBottomSheetVisible}
          />
        );
        break;
    }
  };

  const getDataDreaming = async () => {
    getTotalDreaming("day")
      .then((response) => {
        response.map((l, i) => {
          setTodayDataSecs(formatedSeconds(l.total));
        });
      })
      .catch((error) => console.log(error));
    getTotalDreaming("month")
      .then((response) => {
        response.map((l, i) => {
          setMonthlyDataSecs(formatedSeconds(l.total));
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setReloadData(false);
    setTodayDataSecs(null);
    setMonthlyDataSecs(null);
    setCountAd(countAd + 1);
    if(countAd === 3){
      setCountAd(0);
      showAd();
    }
    getDataDreaming();
  }, [reloadData]);

  const submitDreaming = () => {
    if (validateEmptyForm(time) || time === 0) {
      setError("El timer esta en 0");
    } else {
      postDreaming({
        date: formatedDate(),
        dreamingType: "Secs",
        quantity: time,
      })
        .then(() => {
          setResetTimer(true);
          setError("Agregado");
          setReloadData(true);
        })
        .catch((error) => {
          console.log("Error en Dreaming", error);
          setError("Error en el sistema");
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.containerDreamingDiary}>
      <View style={styles.viewContainer}>
      <Timer
        setTime={setTime}
        resetTimer={resetTimer}
        setResetTimer={setResetTimer}
      />
      <TouchableOpacity
        onPress={() => {
          getComponent("manual");
          toggleModal();
        }}
      >
        <Text style={[styles.textRight]}>Manual</Text>
      </TouchableOpacity>
      <Text style={styles.errorStyle}>{error}</Text>
      <Button
        title="Agregar"
        containerStyle={styles.buttonContainerStyle}
        buttonStyle={styles.buttonStyle}
        onPress={submitDreaming}
      />
      <View style={styles.touchableContainer}>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => {
            getComponent("day");
            toggleModal();
          }}
        >
          <Text style={[styles.subtitle, styles.headerDate]}>Hoy</Text>
          <Divider style={styles.divider} />
          <View style={styles.headerText}>
            {todayDataSecs && <Text>Horas de Sueño</Text>}
            {todayDataSecs && (
              <Text style={styles.subtitle}>{todayDataSecs + " hrs"}</Text>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => {
            getComponent("month");
            toggleBottomSheet();
          }}
        >
          <Text style={[styles.subtitle, styles.headerDate]}>
            Historico del Mes
          </Text>
          <Divider style={styles.divider} />
          <View style={styles.headerText}>
            {monthlyDataSecs && <Text>Horas de Sueño</Text>}
            {monthlyDataSecs && (
              <Text style={styles.subtitle}>{monthlyDataSecs + " hrs"}</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.bottom}>
      <BottomSheet
        isVisible={bottomSheetVisible}
        setIsVisible={setBottomSheetVisible}
      >
        {renderComponent}
      </BottomSheet>
      <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
        {renderComponent}
      </Modal>
      <Ads />
      </View>
    </ScrollView>
  );
};

export default Dreamings;

const styles = StyleSheet.create({
  containerDreamingDiary: {
    backgroundColor: getColor("backgroundColor"),
    flexGrow: 1,
  },
  bottom:{
    flex: 1,
    justifyContent: 'flex-end',
  },
  viewContainer: {
    padding: "5%"
  },
  textRight: {
    alignSelf: "flex-end",
    textDecorationLine: "underline",
    fontSize: 15,
    opacity: 0.5,
  },
  textBottom: {
    alignSelf: "center",
    fontSize: 15,
    opacity: 0.4,
  },
  touchableStyle: {
    flexDirection: "column",
    marginTop: "5%",
    backgroundColor: getColor("cardColor"),
    padding: "3%",
    borderRadius: 5,
    width: "100%",
  },
  touchableContainer: {
    alignItems: "center",
  },
  buttonContainerStyle: {
    marginTop: "3%",
    alignSelf: "center",
    width: "90%",
  },
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
  },
  errorStyle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "red",
  },
  subtitle: {
    textAlign: "center",
    textAlignVertical: "center",
  },
  headerDate: {
    fontWeight: "bold",
    opacity: 0.7,
    marginBottom: "2%",
  },
  divider: {
    marginBottom: "2%",
  },
  headerText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
