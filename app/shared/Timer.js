import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Icon, Input } from "react-native-elements";
import { getColor } from "../utils/colors";
const screen = Dimensions.get("window");

const formatNumber = (number) => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const hrs = Math.floor(time * 3200);
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return {
    hrs: formatNumber(hrs),
    mins: formatNumber(mins),
    secs: formatNumber(secs),
  };
};

const Timer = ({ setTime, resetTimer, setResetTimer }) => {
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { hrs, mins, secs } = getRemaining(remainingSecs);
  const [totalTime, setTotalTime] = useState(`00:00:00`);
  const toggle = () => {
    setIsActive(!isActive);
  };
  const reset = () => {
    setTotalTime(`${hrs}:${mins}:${secs}`);
    setRemainingSecs(0);
    setIsActive(false);
  };
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs((remainingSecs) => remainingSecs + 1);
      }, 1000);
      setTime(remainingSecs);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);
  useEffect(() => {
    setTotalTime(`00:00:00`);
    setResetTimer(false);
  }, [resetTimer === true]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={isActive ? reset : toggle}
        style={styles.button}
      >
        {!isActive ? (
          <Icon
            type="material-community"
            name="play"
            size={100}
            opacity={0.5}
          ></Icon>
        ) : (
          <Text style={styles.buttonText}>{`${hrs}:${mins}:${secs}`}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.resetButton}>
        <Text style={[styles.buttonText, styles.buttonTextReset]}>
          {totalTime}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  resetButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 10,
    borderColor: getColor("headerBackgroundColor"),
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "rgba(60,72,88, 0.4)",
    fontSize: 45,
    marginTop: 5,
  },
  text: {
    color: "rgba(60,72,88, 0.4)",
    fontSize: 15,
    marginTop: 5,
  },
  timerText: {
    color: "black",
    fontSize: 40,
    marginBottom: 20,
  },
  buttonReset: {
    marginTop: 20,
  },
  buttonTextReset: {
    color: "rgba(60,72,88, 0.7)",
  },
});
