import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, Button } from "react-native-elements";
import { getColor } from "../../utils/colors";

const DiapersDiary = () => {
  const [countDiaperPee, setCountDiaperPee] = useState(0);
  const [countDiaperPoo, setCountDiaperPoo] = useState(0);
  const [countDiaperMixed, setCountDiaperMixed] = useState(0);
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
    <View style={styles.diaperContainer}>
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
      <Text style={styles.subtitle}>
        Miercoles: {countDiaperPee + countDiaperPoo + countDiaperMixed}
      </Text>
    </View>
  );
};

export default DiapersDiary;

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
    flex: 1,
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
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.5,
  },
});
