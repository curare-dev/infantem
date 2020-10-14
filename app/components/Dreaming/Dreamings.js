import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Timer from "../../shared/Timer";
import { getColor } from "../../utils/colors";
import DreamingDiaryManual from "./DreamingComponents/DreamingDiaryManual";
import Modal from "../../shared/Modal";
import DreamingDiary from "./DreamingDiary";
import DreamingMonthly from "./DreamingMonthly";
import { Button, Divider } from "react-native-elements";
import {
  getTotalDreaming,
  postDreaming,
} from "../../services/dreaming/dreaming.service";
import { validateEmptyForm } from "../../utils/validations";

const Dreamings = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => setIsVisible(true);
  const [renderComponent, setRenderComponent] = useState(null);
  const [time, setTime] = useState(null);
  const [resetTimer, setResetTimer] = useState(false);
  const [error, setError] = useState("");
  const [reloadData, setReloadData] = useState(false);
  const [todayDataSecs, setTodayDataSecs] = useState(null);
  const [monthlyDataSecs, setMonthlyDataSecs] = useState(null);

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
        setRenderComponent(<DreamingDiary setIsVisible={setIsVisible} />);
        break;
      case "month":
        setRenderComponent(<DreamingMonthly setIsVisible={setIsVisible} />);
        break;
    }
  };

  useEffect(() => {
    setReloadData(false);
    const getDataDreaming = async () => {
      getTotalDreaming("day")
        .then((response) => {
          response.map((l, i) => {
            let d = Number(l.total);
            const h = Math.floor(d / 3600);
            const m = Math.floor((d % 3600) / 60);
            const s = Math.floor((d % 3600) % 60);
            setTodayDataSecs(
              `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
                s < 10 ? "0" + s : s
              }`
            );
          });
        })
        .catch((error) => console.log(error));
      getTotalDreaming("day")
        .then((response) => {
          response.map((l, i) => {
            let d = Number(l.total);
            const h = Math.floor(d / 3600);
            const m = Math.floor((d % 3600) / 60);
            const s = Math.floor((d % 3600) % 60);
            setMonthlyDataSecs(
              `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
                s < 10 ? "0" + s : s
              }`
            );
          });
        })
        .catch((error) => console.log(error));
    };

    getDataDreaming();
  }, [reloadData]);

  const submitDreaming = () => {
    if (validateEmptyForm(time) || time === 0) {
      setError("El timer esta en 0");
    } else {
      postDreaming({
        date: new Date(),
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

        <View style={styles.touchableStyle} onPress={() => {}}>
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
        </View>
      </View>
      <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
        {renderComponent}
      </Modal>
    </ScrollView>
  );
};

export default Dreamings;

const styles = StyleSheet.create({
  containerDreamingDiary: {
    height: Dimensions.get("window").height - 100,
    backgroundColor: getColor("backgroundColor"),
    padding: "10%",
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
