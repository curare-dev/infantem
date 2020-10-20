import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { verifyTokenId } from "../utils/verifyTokenId";
import LogedIn from "../components/Auth/LogedIn";
import NotLogedIn from "../components/Auth/NotLogedIn";
import Loading from "../shared/Loading";

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLogin(false);
    verifyTokenId()
      .then((response) => {
        if (!response) {
          setLoading(false);
          setIsLoggedIn(false);
        } else {
          setLoading(false);
          setIsLoggedIn(true);
        }
      })
      .catch((error) => console.log(error));
  }, [login]);

  return (
    <NavigationContainer>
      {loading && <Loading text="Cargando" />}
      {isLoggedIn ? (
        <LogedIn setLogin={setLogin} />
      ) : (
        <NotLogedIn setLogin={setLogin} />
      )}
    </NavigationContainer>
  );
}

export default Navigation;
