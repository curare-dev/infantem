import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';

const APIKEY = "AIzaSyDt-bzrLkPH4l1TQLZxs0V45ktp-DPxIqE";
// TODO Hash every item in asyncstorage
// Deprecate this method.
export const getLatitudeLongitude = async (address) => {
  const formatedAddress = address.replace(/ /g, "+");
  try {
    let response = await fetch(
      `https://maps.google.com/maps/api/geocode/json?address=${formatedAddress}&key=${APIKEY}`
    );
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Error en traer coordenadas", error);
  }
};

// Optimize
export const getUserLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Hay un error: ", status);
    return status;
  } else {
    let location = await Location.getCurrentPositionAsync({});
    AsyncStorage.setItem('latitude', JSON.stringify(location.coords.latitude));
    AsyncStorage.setItem('longitude', JSON.stringify(location.coords.longitude));
    return location;
  }
};

export const getPlaces = async (lat, long) => {
  if (validateLocation(lat, long)){
    let storagePlaces = await AsyncStorage.getItem('places');
    console.log('Regresó lo cacheado');
    console.log(JSON.parse(storagePlaces));
    return JSON.parse(storagePlaces);
  } else {
      try {
        let response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=10000&type=doctor&keyword=pediatrician&key=${APIKEY}`
        );
        let json = await response.json();
        console.log('Regreso no cacheado');
        console.log(json);
        return json;
      } catch (error) {
        console.error("Error al Buscar Pediatras Cerca: ", error);
        return "Error al buscar Pediatras";
      }
  }
};

const validateLocation = async (lat, long) =>{
  let storageLatitude = await AsyncStorage.getItem('latitude');
  let storageLongitude = await AsyncStorage.getItem('longitude');
  let storagePlaces = await AsyncStorage.getItem('places');
  if(storageLatitude === lat && storageLongitude === long && storagePlaces){
    return true;
  } else {
    return false;
  }
};