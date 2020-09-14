import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Icon } from "react-native-elements";

const Scroller = (props) => {
  let { scroller } = props;
  const { componentChild } = props;
  let scrollYPos = 0;
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );
  const scrollToB = () => {
    scrollYPos = screenHeight * 1;
    scroller.scrollTo({ x: 0, y: scrollYPos });
  };
  const scrollToC = () => {
    scrollYPos = screenHeight * 2;
    scroller.scrollTo({ x: 0, y: scrollYPos });
  };
  const scrollToTop = () => {
    scroller.scrollTo({ x: 0, y: 0 });
  };
  return (
    <SafeAreaView style={styles.container} always>
      <ScrollView
        style={styles.container}
        ref={(scrollerA) => {
          scroller = scrollerA;
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        <View style={styles.generalContainer}>
          <View style={styles.screen}>
            <TouchableOpacity onPress={scrollToB} style={styles.scrollButton}>
              <Icon type="material-community" name="chevron-down" size={30} />
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                onPress={scrollToTop}
                style={styles.scrollButton}
              >
                <Icon type="material-community" name="chevron-up" size={30} />
              </TouchableOpacity>
              <TouchableOpacity onPress={scrollToC} style={styles.scrollButton}>
                <Icon type="material-community" name="chevron-down" size={30} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={scrollToB} style={styles.scrollButton}>
              <Icon type="material-community" name="chevron-up" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.viewContainer}>
            <View style={styles.components}>{componentChild[0]}</View>
            <View style={styles.components}>{componentChild[1]}</View>
            <View style={styles.components}>{componentChild[2]}</View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Scroller;

const styles = StyleSheet.create({
  container: { flex: 1 },
  generalContainer: {
    flexDirection: "row",
    backgroundColor: "#C5C2FF",
  },
  viewContainer: {
    flex: 1,
  },
  components: {
    backgroundColor: "#C5C2FF",
    height: Dimensions.get("window").height,
    alignItems: "stretch",
    padding: 10,
  },
  scrollButton: {
    marginTop: 5,
    marginBottom: 100,
    marginLeft: 10,
  },
  screen: {
    backgroundColor: "#C5C2FF",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  letter: {
    fontSize: 20,
    textAlign: "center",
  },
  scrollButtonText: {
    padding: 20,
    textAlign: "center",
  },
});
