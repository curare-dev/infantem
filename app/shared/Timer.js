import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { getColor } from "../utils/colors";

const Timer = ({resetTimer, setResetTimer, setTime}) => {
  let [initialTime, setInitialTime] = useState(null);
  let [stopTime, setStopTime] = useState(null);
  const [totalTime, setTotalTime] = useState(null);
  const [isPlayDisabled, setIsPlayDisabled] = useState(false);
  const [isStopDisabled, setIsStopDisabled] = useState(true);
  const [reload, setReload] = useState(false);
  const [count, setCount] = useState(null);
  const [displayTime, setDisplayTime] = useState({
    hrs: null,
    mins: null,
    secs: null
  });

  let play = () => {
    setCount(setInterval(()=>{
      let date = new Date();
      setDisplayTime({
        hrs: date.getHours(),
        mins: date.getMinutes(),
        secs: date.getSeconds()
      })
    }, 100));
  };

  let stop = () => {
    clearInterval(count);
  }

  useEffect(() => {
    if (resetTimer) getTime('restart');
    setReload(false);
    if(initialTime && stopTime){
      let hrsT = stopTime.hrs - initialTime.hrs;
      let minT = stopTime.mins - initialTime.mins;
      let secT = Math.abs(stopTime.secs - initialTime.secs);
      console.log(hrsT, minT, secT);
      setTime(hrsT * 60 * 60 + minT * 60 + secT);
      setTotalTime(`Tiempo total: ${hrsT < 10 ? `0${hrsT}` : hrsT}:${minT < 10 ? `0${minT}` : minT}:${secT < 10 ? `0${secT}` : secT}`);
      setResetTimer(false);
    }
  }, [reload, resetTimer])

  const getTime = async (type) => {
    switch (type) {
      case "play":
        let dateS = new Date();
        setIsPlayDisabled(true);
        setIsStopDisabled(false);
        setStopTime(null);
        setTotalTime(null);
        setInitialTime({
          hrs: dateS.getHours(),
          mins: dateS.getMinutes(),
          secs: dateS.getSeconds()
        });
      break;
      case "stop":
        let dateE = new Date();
        setIsPlayDisabled(false);
        setIsStopDisabled(true);
        setStopTime({
          hrs: dateE.getHours(),
          mins: dateE.getMinutes(),
          secs: dateE.getSeconds()
        });
        setReload(true);
      break;
      case "restart":
        console.log('reiniciando');
        setInitialTime( null );
        setStopTime( null );
        setTotalTime( null );
        setTime( null );
        setResetTimer( false );
      break;
    }
  }

  return (
    <View>
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
      <View style={styles.playPauseTime}>
        <Text style={{ fontSize: 20, fontWeight: 'bold'}}>
          {displayTime.hrs || displayTime.mins || displayTime.secs ? `${ displayTime.hrs > 12 ? `${displayTime.hrs - 12 < 10 ? `0${displayTime.hrs - 12}` : displayTime.hrs - 12}` : displayTime.hrs < 10 ? `0${displayTime.hrs}` : displayTime.hrs}:${displayTime.mins < 10 ? `0${displayTime.mins}` : displayTime.mins}:${displayTime.secs < 10 ? `0${displayTime.secs}` : displayTime.secs}` : ``}
        </Text>
      </View>
      <View style={{marginTop: "2%"}}>
      {totalTime && <Text style={{textAlign: "center", marginTop: "1%", fontSize: 20}}>{totalTime}</Text>}
      </View>
      <View>
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
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
