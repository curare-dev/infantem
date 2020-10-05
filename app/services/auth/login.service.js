import { API } from "../../utils/api";
import * as SecureStore from "expo-secure-store";

export const loginService = async (obj) => {
  try {
    let response = await fetch(`${API}/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let status = await response.status;
    if (status === 200) {
      let json = await response.json();
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("id");
      await SecureStore.setItemAsync("token", JSON.stringify(json.token));
      await SecureStore.setItemAsync("id", JSON.stringify(json.id));
      return 0;
    } else if (status === 401) {
      return 1;
    } else {
      return 2;
    }
  } catch (error) {
    console.error("Error desde Servicio login", error);
    return error;
  }
};
