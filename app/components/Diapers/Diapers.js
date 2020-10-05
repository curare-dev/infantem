import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Icon, Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "../../shared/Modal";
import { getColor } from "../../utils/colors";
import DiapersDiary from "./DiapersDiary";
import DiapersMonthly from "./DiapersMonthly";
import DiapersWeekly from "./DiapersWeekly";

const Diapers = () => {
  const [countDiaperPee, setCountDiaperPee] = useState(0);
  const [countDiaperPoo, setCountDiaperPoo] = useState(0);
  const [countDiaperMixed, setCountDiaperMixed] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => setIsVisible(true);
  const [renderComponent, setRenderComponent] = useState(null);
  const getComponent = (component) => {
    switch (component) {
      case "day":
        setRenderComponent(<DiapersDiary setIsVisible={setIsVisible} />);
        break;
      case "week":
        setRenderComponent(<DiapersWeekly setIsVisible={setIsVisible} />);
        break;
      case "month":
        setRenderComponent(<DiapersMonthly setIsVisible={setIsVisible} />);
        break;
    }
  };
  const substractDiaperPee = () => {
    setCountDiaperPee(countDiaperPee - 1);
  };
  const addDiaperPee = () => {
    setCountDiaperPee(countDiaperPee + 1);
  };
  const substractDiaperPoo = () => {
    setCountDiaperPoo(countDiaperPoo - 1);
  };
  const addDiaperPoo = () => {
    setCountDiaperPoo(countDiaperPoo + 1);
  };
  const substractDiaperMixed = () => {
    setCountDiaperMixed(countDiaperMixed - 1);
  };
  const addDiaperMixed = () => {
    setCountDiaperMixed(countDiaperMixed + 1);
  };
  return (
    <View>
      <ScrollView contentContainerStyle={styles.diaperContainer}>
        <View style={styles.minusPlusRow}>
          <Button
            onPress={substractDiaperPee}
            icon={{
              type: "material-community",
              name: "minus",
              iconStyle: styles.bigIcon,
              opacity: 0.7,
            }}
            containerStyle={styles.bigButtonContainer}
            buttonStyle={styles.buttonStyle}
          />
          <View style={styles.countDiapersColumn}>
            <Text style={[styles.subtitle]}>Pipi</Text>
            <Text style={[styles.title]}>{countDiaperPee}</Text>
            <Text style={styles.subtitle}>Pañales</Text>
          </View>

          <Button
            onPress={addDiaperPee}
            icon={{
              type: "material-community",
              name: "plus",
              iconStyle: styles.bigIcon,
              opacity: 0.7,
            }}
            containerStyle={styles.bigButtonContainer}
            buttonStyle={styles.buttonStyle}
          />
        </View>
        <View style={styles.minusPlusRow}>
          <Button
            onPress={substractDiaperPoo}
            icon={{
              type: "material-community",
              name: "minus",
              iconStyle: styles.bigIcon,
              opacity: 0.7,
            }}
            containerStyle={styles.bigButtonContainer}
            buttonStyle={styles.buttonStyle}
          />
          <View style={styles.countDiapersColumn}>
            <Text style={[styles.subtitle]}>Popo</Text>
            <Text style={[styles.title]}>{countDiaperPoo}</Text>
            <Text style={styles.subtitle}>Pañales</Text>
          </View>

          <Button
            onPress={addDiaperPoo}
            icon={{
              type: "material-community",
              name: "plus",
              iconStyle: styles.bigIcon,
              opacity: 0.7,
            }}
            containerStyle={styles.bigButtonContainer}
            buttonStyle={styles.buttonStyle}
          />
        </View>
        <View style={styles.minusPlusRow}>
          <Button
            onPress={substractDiaperMixed}
            icon={{
              type: "material-community",
              name: "minus",
              iconStyle: styles.bigIcon,
              opacity: 0.7,
            }}
            containerStyle={styles.bigButtonContainer}
            buttonStyle={styles.buttonStyle}
          />
          <View style={styles.countDiapersColumn}>
            <Text style={[styles.subtitle]}>Mixto</Text>
            <Text style={[styles.title]}>{countDiaperMixed}</Text>
            <Text style={styles.subtitle}>Pañales</Text>
          </View>

          <Button
            onPress={addDiaperMixed}
            icon={{
              type: "material-community",
              name: "plus",
              iconStyle: styles.bigIcon,
              opacity: 0.7,
            }}
            containerStyle={styles.bigButtonContainer}
            buttonStyle={styles.buttonStyle}
          />
        </View>
        <View style={styles.touchableContainer}>
          <TouchableOpacity
            style={styles.touchableStyle}
            onPress={() => {
              getComponent("day");
              toggleModal();
            }}
          >
            <Text style={styles.subtitle}>Hoy</Text>
            <Text style={styles.subtitle}>16 Pañalitos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableStyle}
            onPress={() => {
              getComponent("week");
              toggleModal();
            }}
          >
            <Text style={styles.subtitle}>Semana</Text>
            <Text style={styles.subtitle}>56 Pañalitos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableStyle}
            onPress={() => {
              getComponent("month");
              toggleModal();
            }}
          >
            <Text style={styles.subtitle}>Mes</Text>
            <Text style={styles.subtitle}>246 Pañalitos</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
          {renderComponent}
        </Modal>
      </ScrollView>
    </View>
  );
};

export default Diapers;

const styles = StyleSheet.create({
  minusPlusRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bigIcon: {
    fontSize: 75,
    alignItems: "center",
  },
  bigButtonContainer: {
    marginTop: "10%",
    alignItems: "center",
  },
  buttonStyle: { backgroundColor: "transparent" },
  diaperContainer: {
    height: Dimensions.get("window").height - 100,
    alignItems: "center",
    backgroundColor: getColor("backgroundColor"),
  },
  countDiapersColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
  },
  title: {
    fontSize: 50,
    opacity: 0.7,
    textAlignVertical: "center",
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.5,
    textAlignVertical: "center",
  },
  touchableStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: "3%",
    marginBottom: "3%",
    backgroundColor: getColor("cardColor"),
    padding: "3%",
    borderRadius: 5,
    width: "90%",
  },
  touchableContainer: {
    alignItems: "center",
  },
});
