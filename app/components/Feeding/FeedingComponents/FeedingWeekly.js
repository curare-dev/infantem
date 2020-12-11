import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { formatedDreamingTitle, formatedUTCDate } from "../../../shared/FormatedDate";
import Modal from "../../../shared/Modal";
import DeleteFeeding from "./DeleteFeeding";
import EditFeeding from "./EditFeeding";

const FeedingWeekly = ({ setReloadMonthly, data, setBottomSheetVisible, setModalVisible, setReloadData }) => {
  const [modalVisibleWeek, setModalVisibleWeek] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [renderData, setRenderData] = useState(null);
  const [reloadWeekly, setReloadWeekly] = useState(false);

  const editDreaming = (data) => {
    setModalVisibleWeek(true);
    setRenderComponent(
      <EditFeeding
        setReloadWeekly={setReloadWeekly}
        setReloadMonthly={setReloadMonthly}
        setModalVisibleWeek={setModalVisibleWeek}
        setBottomSheetVisible={setBottomSheetVisible}
        setModalVisible={setModalVisible}
        setReloadData={setReloadData}
        data={data}
      />
    );
  }

  const deleteDreaming = (id) => {
    setModalVisibleWeek(true);
    setRenderComponent(
      <DeleteFeeding
        setReloadMonthly={setReloadMonthly}
        setReloadWeekly={setReloadWeekly}
        setModalVisibleWeek={setModalVisibleWeek}
        setModalVisible={setModalVisible}
        setReloadData={setReloadData}
        data={id}
      />
    );
  }

  useEffect(() => {
    setReloadWeekly(false);
    setRenderData(
      data.map((l, i) => {
        return (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{formatedDreamingTitle(l.feedingType, l.quantity)}</ListItem.Title>
              <ListItem.Subtitle>{formatedUTCDate(l)}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon   
              name='pencil'
              type='material-community'
              size={20}
              onPress={()=>editDreaming(l)}
            />
            <Icon   
              name='delete'
              type='material-community'
              size={20}
              onPress={()=>deleteDreaming(l)}
            />
          </ListItem>
        );
      })
    );
  }, [reloadWeekly])

  return (
    <ScrollView>
      {renderData}
      <Modal isVisible={modalVisibleWeek} setIsVisible={setModalVisibleWeek}>
        {renderComponent}
      </Modal>
    </ScrollView>
  );
};

export default FeedingWeekly;

const styles = StyleSheet.create({});
