import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  Icon,
  Button,
  BottomSheet,
  ListItem,
  Divider,
} from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  getTotalDiapers,
  postDiaper,
} from "../../services/diaper/diaper.service";
import Modal from "../../shared/Modal";
import { getColor } from "../../utils/colors";
import DiapersMonthly from "./DiaperComponents/DiapersMonthly";
import DiapersDiary from "./DiaperComponents/DiapersDiary";
import Ads, { showAd } from "../../shared/Ads";
import { formatedDate } from "../../shared/FormatedDate";

const Diapers = () => {
  const [countDiaper, setCountDiaper] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => setIsVisible(true);
  const [renderComponent, setRenderComponent] = useState(null);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [reloadData, setReloadData] = useState(false);
  const [peeDay, setPeeDay] = useState("");
  const [pooDay, setPooDay] = useState("");
  const [mixedDay, setMixedDay] = useState("");
  const [peeMonth, setPeeMonth] = useState("");
  const [pooMonth, setPooMonth] = useState("");
  const [mixedMonth, setMixedMonth] = useState("");
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const toggleBottomSheet = () => setBottomSheetVisible(!bottomSheetVisible);
  const [countAd, setCountAd] = useState(0);

  const getComponent = (component) => {
    switch (component) {
      case "day":
        setRenderComponent(<DiapersDiary setIsVisible={setIsVisible} setReloadData={setReloadData} />);
        break;
      case "month":
        setRenderComponent(<DiapersMonthly 
            setReloadData={setReloadData}
            setBottomSheetVisible={setBottomSheetVisible} 
          />);
        break;
    }
  };
  const substractDiaper = () => {
    setCountDiaper(countDiaper - 1);
  };
  const addDiaper = () => {
    setCountDiaper(countDiaper + 1);
  };

  const list = [
    {
      title: "Pipi",
      subject: "pee",
    },
    {
      title: "Popo",
      subject: "poo",
    },
    {
      title: "Mixto",
      subject: "mixed",
    },
  ];

  const submitDiaper = () => {
    if (countDiaper <= 0) {
      setError("No has agregado pañales");
    } else if (subject === null || subject === "" || subject === undefined) {
      setError("Selecciona de que ensució el pañal");
    } else {
      let obj = {
        quantity: countDiaper,
        date: formatedDate(),
        diaperType: subject,
      };
      postDiaper(obj)
        .then((response) => {
          setReloadData(true);
          setCountDiaper(0);
          setError("");
        })
        .catch((error) => {
          setError("Error en el sistema");
        });
    }
  };

  const getData = async () => {
    await getTotalDiapers("day")
      .then((response) => {
        response.map((l, i) => {
          if (l._id === "pee") {
            setPeeDay(l.total);
          }
          if (l._id === "poo") {
            setPooDay(l.total);
          }
          if (l._id === "mixed") {
            setMixedDay(l.total);
          }
        });
      })
      .catch((error) => console.log("Error de get por dia"));
    await getTotalDiapers("month")
      .then((response) => {
        response.map((l, i) => {
          if (l._id === "pee") {
            setPeeMonth(l.total);
          }
          if (l._id === "poo") {
            setPooMonth(l.total);
          }
          if (l._id === "mixed") {
            setMixedMonth(l.total);
          }
        });
      })
      .catch((error) => console.log("Error de get por mes"));
  };

  useEffect(() => {
    setReloadData(false);
    setPeeDay(null);
    setPooDay(null);
    setMixedDay(null);
    setPeeMonth(null);
    setPooMonth(null);
    setMixedMonth(null);
    setCountAd(countAd + 1);
    if(countAd === 3){
      setCountAd(0);
      showAd();
    }
    getData();
  }, [reloadData]);

  const toggleBottonSheet = () => {
    setVisible(!isVisible);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.diaperContainer}>
      <View>
      <TouchableOpacity
        style={styles.touchableStyle}
        onPress={toggleBottonSheet}
      >
        <Text style={styles.selectDiaperType}>
          Selecciona de que se ensució el pañal
        </Text>
      </TouchableOpacity>
      <View style={styles.circleButton}>
        {countDiaper <= 0 ? (
          <Text></Text>
        ) : (
          <Icon
            type="material-community"
            name="minus"
            iconStyle={[styles.bigIcon]}
            opacity={0.7}
            onPress={substractDiaper}
          />
        )}
        <View style={styles.countDiapersColumn}>
          <Text style={[styles.title]}>{countDiaper}</Text>
          <Text style={styles.subtitle}>{title ? `${title}` : ""}</Text>
        </View>
        {countDiaper >= 10 ? (
          <Text></Text>
        ) : (
          <Icon
            type="material-community"
            name="plus"
            iconStyle={[styles.bigIcon]}
            opacity={0.7}
            onPress={addDiaper}
          />
        )}
      </View>
      {error === null ? null : <Text style={styles.errorStyle}>{error}</Text>}
      <Button
        title="Agregar"
        containerStyle={styles.addButtonContainer}
        buttonStyle={styles.addButtonStyle}
        onPress={submitDiaper}
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
          {pooDay ? (
            <View style={styles.headerText}>
              <Text>Popo</Text>
              <Text style={styles.subtitle}>{pooDay + " Pañales"}</Text>
            </View>
          ) : null}
          {peeDay ? (
            <View style={styles.headerText}>
              <Text>Pipi</Text>
              <Text style={styles.subtitle}>{peeDay + " Pañales"}</Text>
            </View>
          ) : null}
          {mixedDay ? (
            <View style={styles.headerText}>
              <Text>Mixto</Text>
              <Text style={styles.subtitle}>{mixedDay + " Pañales"}</Text>
            </View>
          ) : null}
          <Divider style={styles.divider} />
          {pooDay || mixedDay || peeDay ? (
            <View style={styles.headerText}>
              <Text>Total</Text>
              <Text style={styles.subtitle}>{mixedDay + pooDay + peeDay}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => {
            getComponent("month");
            toggleBottomSheet();
          }}
        >
          <Text style={[styles.subtitle, styles.headerDate]}>Mes</Text>
          <Divider style={styles.divider} />
          {pooMonth ? (
            <View style={styles.headerText}>
              <Text>Popo</Text>
              <Text style={styles.subtitle}>{pooMonth + " Pañales"}</Text>
            </View>
          ) : null}
          {peeMonth ? (
            <View style={styles.headerText}>
              <Text>Pipi</Text>
              <Text style={styles.subtitle}>{peeMonth + " Pañales"}</Text>
            </View>
          ) : null}
          {mixedMonth ? (
            <View style={styles.headerText}>
              <Text>Mixto</Text>
              <Text style={styles.subtitle}>{mixedMonth + " Pañales"}</Text>
            </View>
          ) : null}
          <Divider style={styles.divider} />
          {pooMonth || peeMonth || mixedMonth ? (
            <View style={styles.headerText}>
              <Text>Total</Text>
              <Text style={styles.subtitle}>
                {pooMonth + peeMonth + mixedMonth}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.bottom}>
        <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
          {renderComponent}
        </Modal>
        <BottomSheet isVisible={visible}>
          {list.map((l, i) => {
            return (
              <ListItem
                key={i}
                containerStyle={l.containerStyle}
                onPress={() => {
                  setTitle(l.title);
                  setSubject(l.subject);
                  setVisible(false);
                }}
              >
                <ListItem.Content>
                  <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            );
          })}
        </BottomSheet>
        <BottomSheet
          isVisible={bottomSheetVisible}
          setIsVisible={setBottomSheetVisible}
        >
          {renderComponent}
        </BottomSheet>
      </View>
      </ScrollView>
      <Ads />
    </View>
  );
};

export default Diapers;

const styles = StyleSheet.create({
  circleButton: {
    borderWidth: 10,
    borderColor: getColor("headerBackgroundColor"),
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").width / 2,
    borderRadius: Dimensions.get("window").width / 2,
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
  },
  addButtonContainer: {
    alignSelf: "center",
    width: "70%",
  },
  addButtonStyle: {
    backgroundColor: getColor("buttonColor"),
  },
  bigIcon: {
    textAlignVertical: "center",
    fontSize: 50,
    opacity: 0.7,
  },
  bigButtonContainer: {
    alignItems: "center",
  },
  diaperContainer: {
    flexGrow: 1,
    backgroundColor: getColor("backgroundColor"),
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  countDiapersColumn: {
    flexDirection: "column",
  },
  title: {
    marginTop: "25%",
    fontSize: 60,
    opacity: 0.5,
  },
  subtitle: {
    textAlignVertical: "center",
    textAlign: "center",
  },
  touchableStyle: {
    flexDirection: "column",
    marginTop: "3%",
    marginBottom: "3%",
    backgroundColor: getColor("cardColor"),
    padding: "3%",
    borderRadius: 5,
    width: "80%",
    alignSelf: "center",
  },

  selectDiaperType: {
    textAlign: "center",
    opacity: 0.5,
    fontWeight: "bold",
  },
  errorStyle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "red",
  },
  headerDate: {
    fontWeight: "bold",
    opacity: 0.7,
    marginBottom: "2%",
  },
  divider: {
    marginTop: "2%",
    marginBottom: "2%",
  },
  headerText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
