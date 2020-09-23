import { API } from "../../utils/api";
import * as SecureStore from "expo-secure-store";

export const register = async (obj) => {
  try {
    let response = await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let status = await response.status;
    if (status === 201) {
      let json = await response.json();
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("id");
      await SecureStore.setItemAsync("token", JSON.stringify(json.token));
      await SecureStore.setItemAsync("id", JSON.stringify(json.id));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error desde Servicio register", error);
    return error;
  }
};
