import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { verifyTokenId } from "../utils/verifyTokenId";
import LogedIn from "../components/Auth/LogedIn";
import NotLogedIn from "../components/Auth/NotLogedIn";

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setLogin(false);
    verifyTokenId()
      .then((response) => {
        if (!response) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      })
      .catch((error) => console.log(error));
  }, [login]);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <LogedIn setLogin={setLogin} />
      ) : (
        <NotLogedIn setLogin={setLogin} />
      )}
    </NavigationContainer>
  );
}

export default Navigation;
