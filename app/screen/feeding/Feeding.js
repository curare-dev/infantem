import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Scroller from "../../shared/Scroller";
import FeedingDiary from "../../components/Feeding/FeedingDiary";
import FeedingMonthly from "../../components/Feeding/FeedingMonthly";
import FeedingWeekly from "../../components/Feeding/FeedingWeekly";
const Feeding = () => {
  return <FeedingDiary />;
};

export default Feeding;

const styles = StyleSheet.create({});
