import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';

const APIKEY = "AIzaSyDt-bzrLkPH4l1TQLZxs0V45ktp-DPxIqE";
// TODO Hash every item in asyncstorage
// Deprecate this method.
// TODO Apply this method in infantem for medics
// export const getLatitudeLongitude = async (address) => {
//   const formatedAddress = address.replace(/ /g, "+");
//   try {
//     let response = await fetch(
//       `https://maps.google.com/maps/api/geocode/json?address=${formatedAddress}&key=${APIKEY}`
//     );
//     let json = await response.json();
//     return json;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const getUserLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return status;
  } else {
    let location = await Location.getCurrentPositionAsync({});
    await AsyncStorage.setItem('latitude', JSON.stringify(location.coords.latitude));
    await AsyncStorage.setItem('longitude', JSON.stringify(location.coords.longitude));
    return location;
  }
};

export const getPlaces = async (lat, long) => {
  let storagePlaces = await AsyncStorage.getItem('places');
  if (await validateLocation(lat, long)){
    console.log('From cache');
    let newJson = JSON.parse(storagePlaces).results.map( v => {
      return {
        place_id: v.place_id,
        name: v.name,
        vicinity: v.vicinity,
        location: v.geometry.location
      }
    });
    return newJson;
  } else {
    console.log('From api');
      try {
        let response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=10000&type=doctor&keyword=pediatrician&key=${APIKEY}`
        );
        let json = await response.json();
        await AsyncStorage.setItem('places', JSON.stringify(json));
        return json;
      } catch (error) {
        return "Error al buscar Pediatras";
      }
  }
};

// TODO Modificar, para que desde el backend indique que se debe actualizar lo que está en cache
const validateLocation = async (lat, long) => {
  let storageLatitude = await AsyncStorage.getItem('latitude');
  let storageLongitude = await AsyncStorage.getItem('longitude');
  let storagePlaces = await AsyncStorage.getItem('places');
  if(storageLatitude == lat && storageLongitude == long && storagePlaces){
    return true;
  } else {
    await AsyncStorage.removeItem('latitude');
    await AsyncStorage.removeItem('longitude');
    await AsyncStorage.removeItem('places');
    return false;
  }
};