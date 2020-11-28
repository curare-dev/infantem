import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const APIKEY = "AIzaSyDt-bzrLkPH4l1TQLZxs0V45ktp-DPxIqE";

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

export const getUserLocation = async () => {
  let { status } = await Location.requestPermissionsAsync();
  if (status !== "granted") {
    console.log("Hay un error: ", status);
    return status;
  } else {
    let location = await Location.getCurrentPositionAsync({});
    return location;
  }
};

export const getPlaces = async (lat, long) => {
  console.log("Buscando pediatras cercanos a la posición: ", lat, long);
  try {
    let response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=10000&type=doctor&keyword=pediatrician&key=${APIKEY}`
    );
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Error al Buscar Pediatras Cerca: ", error);
    return "Error al buscar Pediatras";
  }
};
