import React, { useEffect, useState } from "react";
import { StyleSheet, View, Switch, TouchableOpacity } from "react-native";
import { Divider, Text, BottomSheet } from "react-native-elements";
import { getColor } from "../../utils/colors";
import { ScrollView } from "react-native-gesture-handler";
import FormulaFeeding from "./FeedingComponents/FormulaFeeding";
import BreastFeeding from "./FeedingComponents/BreastFeeding";
import { getTotalFeeding } from "../../services/feeding/feeding.service";
import Modal from "../../shared/Modal";
import FeedingDiary from "./FeedingComponents/FeedingDiary";
import FeedingMonthly from "./FeedingComponents/FeedingMonthly";
import {
  AdMobBanner,
  AdMobInterstitial,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

const Feedings = ({ user }) => {
  const [reloadData, setReloadData] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const toggleModal = () => setIsVisible(true);
  const toggleBottomSheet = () => setBottomSheetVisible(true);
  const [todayDataOz, setTodayDataOz] = useState(null);
  const [todayDataMl, setTodayDataMl] = useState(null);
  const [todayDataSecs, setTodayDataSecs] = useState(null);
  const [monthlyDataOz, setMonthlyDataOz] = useState(null);
  const [monthlyDataMl, setMonthlyDataMl] = useState(null);
  const [monthlyDataSecs, setMonthlyDataSecs] = useState(null);
  const [renderComponent, setRenderComponent] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [countAd, setCountAd] = useState(0);

  const showAd = async () => {
    await setTestDeviceIDAsync('EMULATOR');
    await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false});
    await AdMobInterstitial.showAdAsync();
    setCountAd(0);
  }

  // let countDate = new Date().getTime();
  // let myFunc = setInterval(() => {
  //   let countStop = new Date().getTime();
  //   let timeLeft = countStop - countDate;
  //   let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  //   let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  //   console.log(hours, minutes, seconds)
  // }, 1000);

  useEffect(() => {
    setCountAd(countAd + 1);
    setTodayDataOz(null); 
    setTodayDataMl(null);
    setTodayDataSecs(null); 
    setMonthlyDataOz(null);
    setMonthlyDataMl(null);
    setMonthlyDataSecs(null);
    setReloadData(false);
    if(countAd === 3){
      showAd();
    }
    async function getTotalData() {
      getTotalFeeding("day")
        .then((response) => {
          console.log(response);
          response.map((l, i) => {
            console.log(l);
            let d = Number(l.total);
            const h = Math.floor(d / 3600);
            const m = Math.floor((d % 3600) / 60);
            const s = Math.floor((d % 3600) % 60);
            if (l._id === "oz") {
              setTodayDataOz(l.total);
            }
            if (l._id === "ml") {
              setTodayDataMl(l.total);
            }
            if (l._id === "Secs") {
              setTodayDataSecs(
                `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
                  s < 10 ? "0" + s : s
                }`
              );
            }
          });
        })
        .catch((error) => console.log(error));
      getTotalFeeding("month")
        .then((response) => {
          response.map((l, i) => {
            if (l._id === "oz") {
              setMonthlyDataOz(l.total);
            }
            if (l._id === "ml") {
              setMonthlyDataMl(l.total);
            }
            if (l._id === "Secs") {
              let d = Number(l.total);
              const h = Math.floor(d / 3600);
              const m = Math.floor((d % 3600) / 60);
              const s = Math.floor((d % 3600) % 60);
              setMonthlyDataSecs(
                `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
                  s < 10 ? "0" + s : s
                }`
              );
            }
          });
        })
        .catch((error) => console.log(error));
    }
    getTotalData();
  }, [reloadData]);

  const getComponent = (component) => {
    switch (component) {
      case "day":
        setRenderComponent(
          <FeedingDiary
            setReloadData={setReloadData}
            setIsVisible={setIsVisible}
          />
        );
        break;
      case "month":
        setRenderComponent(
          <FeedingMonthly
            setReloadData={setReloadData}
            setBottomSheetVisible={setBottomSheetVisible}
          />
        );
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.containerFeedingDiary}>
      <View style={styles.viewContainer}>
      <View style={styles.viewSwitch}>
        <Text>Fórmula Láctea</Text>
        <Switch
          trackColor={{
            false: "rgba(60,72,88, 0.4)",
            true: "rgba(60,72,88, 0.7)",
          }}
          thumbColor={isEnabled ? "#9E99FF" : "#B9AAFF"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text>Lactancia Materna</Text>
      </View>
      {!isEnabled ? (
        <FormulaFeeding setReloadData={setReloadData} user={user} />
      ) : (
        <BreastFeeding setReloadData={setReloadData} />
      )}
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
            {todayDataOz || todayDataMl ? <Text>Formula</Text> : null}
            {todayDataOz ? (
              <Text style={styles.subtitle}>{todayDataOz + " Onzas"}</Text>
            ) :
            null}
            {todayDataMl && (
              <Text style={styles.subtitle}>{todayDataMl + " ml"}</Text>
            )}
          </View>
          <View style={styles.headerText}>
            {todayDataSecs && <Text>Lactancia Materna</Text>}
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
            {monthlyDataOz || monthlyDataMl ? <Text>Formula</Text> : null}

            {monthlyDataOz && (
              <Text style={styles.subtitle}>{monthlyDataOz + " Onzas"}</Text>
            )}
            {monthlyDataMl && (
              <Text style={styles.subtitle}>{monthlyDataMl + " ml"}</Text>
            )}
          </View>
          <View style={styles.headerText}>
            {monthlyDataSecs && <Text>Lactancia Materna</Text>}
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
      <AdMobBanner
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={"No se encontró anuncio"} 
        style={styles.ad}
      />
      </View>
    </ScrollView>

  );
};

export default Feedings;

const styles = StyleSheet.create({
  viewSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    opacity: 0.7,
  },
  buttonStyle: {
    backgroundColor: getColor("buttonColor"),
    width: "90%",
  },
  containerFeedingDiary: {
    flexGrow: 1,
    backgroundColor: getColor("backgroundColor"),
  },
  bottom:{
    flex: 1,
    justifyContent: 'flex-end',
  },
  viewContainer: {
    padding: "5%"
  },
  textBottom: {
    alignSelf: "center",
    fontSize: 15,
    opacity: 0.4,
  },
  headerText: {
    flexDirection: "row",
    justifyContent: "space-between",
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
});
