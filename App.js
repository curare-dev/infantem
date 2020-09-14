import React from "react";
import Navigation from "./app/navigation/Navigation";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Looks like", "Failed prop"]);

function App() {
  return <Navigation />;
}
export default App;
