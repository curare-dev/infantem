import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements';
import { formatedDiapersTitle, formatedUTCDate } from '../../../shared/FormatedDate';
import Modal from '../../../shared/Modal';
import DeleteDiaper from './DeleteDiaper';
import EditDiaper from './EditDiaper';

const DiapersWeekly = ({ setReloadMonthly, data, setBottomSheetVisible, setModalVisible, setReloadData }) => {

  const [modalVisibleWeek, setModalVisibleWeek] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [renderData, setRenderData] = useState(null);
  const [reloadWeekly, setReloadWeekly] = useState(false);

  const editDiaper = (data) => {
    setModalVisibleWeek(true);
    setRenderComponent(
      <EditDiaper
        setReloadMonthly={setReloadMonthly}
        setReloadWeekly={setReloadWeekly}
        setModalVisibleWeek={setModalVisibleWeek}
        setBottomSheetVisible={setBottomSheetVisible}
        setModalVisible={setModalVisible}
        setReloadData={setReloadData}
        data={data}
      />
    );
  }

  const deleteDiaper = (id) => {
    setModalVisibleWeek(true);
    setRenderComponent(
      <DeleteDiaper
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
              <ListItem.Title>{formatedDiapersTitle(l.diaperType, l.quantity)}</ListItem.Title>
              <ListItem.Subtitle>{formatedUTCDate(l)}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon   
            name='pencil'
            type='material-community'
            size={20}
            onPress={()=>editDiaper(l)}
            />
            <Icon   
            name='delete'
            type='material-community'
            size={20}
            onPress={()=>deleteDiaper(l)}
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
  )
}

export default DiapersWeekly

const styles = StyleSheet.create({})
