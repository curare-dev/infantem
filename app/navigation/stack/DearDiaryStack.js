import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DearDiary from "../../screen/dearDiary/DearDiary";
import DearDiaryHistory from "../../screen/dearDiary/DearDiaryHistory";

const Stack = createStackNavigator();

function DearDiaryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="dearDiary"
        component={DearDiary}
        options={{ title: "Dear Diary" }}
      ></Stack.Screen>
      <Stack.Screen
        name="dearDiaryHistory"
        component={DearDiaryHistory}
        options={{ title: "Diary" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default DearDiaryStack;
