import React from "react";
import Navigation from "./app/navigation/Navigation";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Looks like", "Failed prop", "It appears"]);

function App() {
  return <Navigation />;
}
export default App;
