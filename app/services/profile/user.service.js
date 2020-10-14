import { API } from "../../utils/api";
import * as SecureStore from "expo-secure-store";

export const getUserById = async () => {
  try {
    let userid = await SecureStore.getItemAsync("id");
    userid ? (userid = userid.slice(1, -1)) : false;
    let response = await fetch(`${API}/user/${userid}`);
    let status = await response.status;
    if (status === 200 || status === 304) {
      let json = await response.json();
      return json;
    } else return false;
  } catch (error) {
    console.error(error);
  }
};

export const updateUserById = async (obj) => {
  try {
    let userid = await SecureStore.getItemAsync("id");
    userid = userid.slice(1, -1);
    let response = await fetch(`${API}/user/${userid}`, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let status = await response.status;
    if (status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error desde Servicio register", error);
    return error;
  }
};

export const updatePassword = async (obj) => {
  try {
    let userid = await SecureStore.getItemAsync("id");
    userid = userid.slice(1, -1);
    let response = await fetch(`${API}/user/resetPassword/${userid}`, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let status = await response.status;
    if (status === 204) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error desde Servicio updatePassword", error);
    return error;
  }
};
