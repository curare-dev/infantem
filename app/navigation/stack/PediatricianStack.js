import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Pediatrician from "../../screen/pediatrician/Pediatrician";
import { getColor } from "../../utils/colors";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "../../shared/Modal";
import ShowAppointments from "../../components/Pediatrician/ShowAppointments";

const Stack = createStackNavigator();

const PediatricianStack = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="pediatrician"
        component={() => (
          <Pediatrician
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          ></Pediatrician>
        )}
        options={{
          headerTitle: () => <Text style={styles.headerTitle}>Pediatras</Text>,
          headerStyle: {
            backgroundColor: getColor("headerBackgroundColor"),
            height: 130,
            elevation: 0,
            shadowColor: getColor("shadowColor"),
          },
          headerRight: () => (
            <TouchableOpacity
              style={styles.iconCalendar}
              onPress={toggleVisible}
            >
              <Text style={styles.text}>Ver tus Citas</Text>
              <Icon
                type="material-community"
                name="calendar"
                color={getColor("headerText")}
              />
            </TouchableOpacity>
          ),
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default PediatricianStack;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 25,
    paddingTop: 20,
    paddingLeft: 20,
    color: getColor("headerText"),
  },
  iconCalendar: {
    flexDirection: "row",
    padding: 20,
    opacity: 0.6,
  },
  text: {
    color: getColor("headerText"),
    textAlignVertical: "center",
  },
});
