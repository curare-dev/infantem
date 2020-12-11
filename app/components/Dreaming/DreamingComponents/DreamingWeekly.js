import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { formatedSeconds, formatedUTCDate } from "../../../shared/FormatedDate";
import Modal from "../../../shared/Modal";
import DeleteDreaming from "./DeleteDreaming";
import EditDreaming from "./EditDreaming";

const DreamingWeekly = ({ setReloadMonthly, data, setBottomSheetVisible, setModalVisible, setReloadData }) => {
  const [modalVisibleWeek, setModalVisibleWeek] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [renderData, setRenderData] = useState(null);
  const [reloadWeekly, setReloadWeekly] = useState(false);

  const editDreaming = data => {
    setModalVisibleWeek(true);
    setRenderComponent(<EditDreaming
      setReloadMonthly={setReloadMonthly}
      setReloadWeekly={setReloadWeekly}
      setModalVisibleWeek={setModalVisibleWeek}
      setBottomSheetVisible={setBottomSheetVisible}
      setModalVisible={setModalVisible}
      setReloadData={setReloadData}
      data={data}
      />);
  }

  const deleteDreaming = (data) => {
    setModalVisibleWeek(true);
    setRenderComponent(<DeleteDreaming
      setReloadMonthly={setReloadMonthly}
      setReloadWeekly={setReloadWeekly}
      setModalVisibleWeek={setModalVisibleWeek}
      setModalVisible={setModalVisible}
      setReloadData={setReloadData}
      data={data}
      />);
  }

  useEffect(() => {
    setReloadWeekly(false);
    setRenderData(
      data.map((l, i) => {
        return (
          <ListItem key={i}>
            <ListItem.Content>
              <ListItem.Title>
                {formatedSeconds(l.quantity)} 
              </ListItem.Title>
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
  }, [reloadWeekly]);

  return (
    <ScrollView>
    {renderData}
    <Modal isVisible={modalVisibleWeek} setIsVisible={setModalVisibleWeek}>
      {renderComponent}
    </Modal>
    </ScrollView>
  );
};

export default DreamingWeekly;

const styles = StyleSheet.create({});
