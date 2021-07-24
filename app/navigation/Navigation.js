import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { verifyTokenId } from "../utils/verifyTokenId";
import LogedIn from "../components/Auth/LogedIn";
import NotLogedIn from "../components/Auth/NotLogedIn";
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';

function Navigation() {
  const [login, setLogin] = useState(false);
  const [component, setComponent] = useState(null);
  const [isReady, setReady] = useState(false);

  const tokenId = async () => {
    await verifyTokenId()
      .then((response) => {
        if (!response) {
          getComponent(3);
        } else {
          getComponent(2);
        }
      })
      .catch((error) => console.log(error));
  }

  const  _cacheResourcesAsync = async () => {
    const images = [require('../../assets/splash.png')];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    }); 
    return Promise.all(cacheImages);
  }

  useEffect(() => {
    setLogin(false);
    tokenId();
  }, [login]);

  const getComponent = (component) => {
    switch (component) {
      case 2: 
        setComponent (
            <LogedIn setLogin={setLogin} />
          )
        break; 
      case 3: 
        setComponent (
            <NotLogedIn setLogin={setLogin} />
          )
        break;
    }
  }

  return (
    isReady === false ? ( 
      <AppLoading
        startAsync={_cacheResourcesAsync}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />) 
      : (
      <NavigationContainer>
        {component}
      </NavigationContainer>)
 );
}

export default Navigation;
