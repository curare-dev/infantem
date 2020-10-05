import React, { useState } from "react";
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
import DreamingWeekly from "./DreamingWeekly";
import DreamingMonthly from "./DreamingMonthly";

const Dreamings = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => setIsVisible(true);
  const [renderComponent, setRenderComponent] = useState(null);
  const [time, setTime] = useState(null);
  const [resetTimer, setResetTimer] = useState(false);
  const getComponent = (component) => {
    switch (component) {
      case "manual":
        setRenderComponent(<DreamingDiaryManual setIsVisible={setIsVisible} />);
        break;
      case "day":
        setRenderComponent(<DreamingDiary setIsVisible={setIsVisible} />);
        break;
      case "week":
        setRenderComponent(<DreamingWeekly setIsVisible={setIsVisible} />);
        break;
      case "month":
        setRenderComponent(<DreamingMonthly setIsVisible={setIsVisible} />);
        break;
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.containerDreamingDiary}>
      <Timer
        setTime={setTime}
        resetTimer={resetTimer}
        setResetTimer={setResetTimer}
      />
      <Text style={[styles.textBottom]}>Saturday</Text>
      <TouchableOpacity
        onPress={() => {
          getComponent("manual");
          toggleModal();
        }}
      >
        <Text style={[styles.textRight]}>Manual</Text>
      </TouchableOpacity>
      <View style={styles.touchableContainer}>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => {
            getComponent("day");
            toggleModal();
          }}
        >
          <Text style={styles.subtitle}>Hoy</Text>
          <Text style={styles.subtitle}>16 Horas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => {
            getComponent("week");
            toggleModal();
          }}
        >
          <Text style={styles.subtitle}>Semana</Text>
          <Text style={styles.subtitle}>56 Horas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => {
            getComponent("month");
            toggleModal();
          }}
        >
          <Text style={styles.subtitle}>Mes</Text>
          <Text style={styles.subtitle}>246 Horas</Text>
        </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: "5%",
    backgroundColor: getColor("cardColor"),
    padding: "3%",
    borderRadius: 5,
    width: "100%",
  },
  touchableContainer: {
    alignItems: "center",
  },
});
