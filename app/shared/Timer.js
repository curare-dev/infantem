import React, { useState, useEffect, useRef } from "react";
import { Dimensions, Animated } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { getColor } from "../utils/colors";

const Timer = ({resetTimer, setTime, setIsSubmitDisabled}) => {
  const [isPlayDisabled, setIsPlayDisabled] = useState(false);
  const [isStopDisabled, setIsStopDisabled] = useState(true);
  const [count, setCount] = useState(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [displayTime, setDisplayTime] = useState(null);
  let startTime;
  let elapsedTime = 0;

  useEffect(()=>{
    resetTimer && setDisplayTime('00:00:00');
  }, [resetTimer]);

  function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    setTime(hh * 60 * 60 + mm * 60 + ss);
    return `${formattedHH}:${formattedMM}:${formattedSS}`;
  }

  let play = () => {
    animation();
    startTime = Date.now() - elapsedTime;
    setCount(setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      setDisplayTime(timeToString(elapsedTime));
    }, 100));
  };

  let stop = () => {
    clearInterval(count);
    elapsedTime = 0;
    fadeAnim.setValue(1);
    fadeAnim.stopAnimation();
  }

  const animation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        })
      ]),
    ).start();
  }

  const getTime = async (type) => {
    switch (type) {
      case "play":
        setIsPlayDisabled(true);
        setIsStopDisabled(false);
        setIsSubmitDisabled(false);
      break;
      case "stop":
        setIsPlayDisabled(false);
        setIsStopDisabled(true);
        setIsSubmitDisabled(true);
      break;
    }
  }

  return (
    <View>
      <View style={{ position: 'relative' }}>
        <Animated.View style={{
          opacity: fadeAnim,
          borderWidth: Dimensions.get('window').width * 0.01,
          borderColor: getColor("headerBackgroundColor"),
          width: Dimensions.get("window").width / 3,
          height: Dimensions.get("window").width / 3,
          borderRadius: Dimensions.get("window").width / 3,
          alignItems: "center",
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "space-around",
          textAlign: "center",
          textAlignVertical: "center",
          alignSelf: "center",
        }}>
      </Animated.View>
      <Text style={{ 
          position: 'absolute',  
          top: '40%', 
          left: '41.5%', 
          fontSize: Dimensions.get('window').width * 0.04,
          fontWeight: 'bold'
        }}>
          {displayTime ? displayTime : '00:00:00'}
      </Text>
      </View>

      <View style={styles.playPause}> 
        <TouchableOpacity disabled={isPlayDisabled} onPress={()=>{
          play();
          getTime("play");
        }} style={{justifyContent: "center"}}>
          <Text style={{fontSize: 25, color: isPlayDisabled ? 'gray' : getColor('headerBackgroundColor')}}>Inicio</Text>
          <Icon size={50} color={isPlayDisabled ? 'gray' : getColor('headerBackgroundColor')} type="material-community" name="play" />
        </TouchableOpacity>
        <View
          style={{
          borderLeftWidth: 3,
          opacity: 0.5,
          marginLeft: "5%"
          }}
        />
        <TouchableOpacity disabled={isStopDisabled} onPress={()=>{
          stop();
          getTime("stop");
        }} style={{justifyContent: "center"}}>
          <Text style={{fontSize: 25, color: isStopDisabled ? 'gray' : getColor('headerBackgroundColor')}}>Detener</Text>
          <Icon size={50} color={isStopDisabled ? 'gray' : getColor('headerBackgroundColor')} type="material-community" name="stop" />
        </TouchableOpacity>
      </View>
      <View>
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  circleButton: {
    borderWidth: 10,
    borderColor: getColor("headerBackgroundColor"),
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").width / 3,
    borderRadius: Dimensions.get("window").width / 3,
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
  },
  playPause: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  playPauseTime: {
    marginTop: "2%",
    flexDirection: "row",
    justifyContent: "space-around",
  }
});
