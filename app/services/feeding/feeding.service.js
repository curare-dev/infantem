import { API } from "../../utils/api";
import * as SecureStore from "expo-secure-store";

export const postfeeding = async (obj) => {
  try {
    let userid = await SecureStore.getItemAsync("id");
    userid = userid.slice(1, -1);
    obj.userId = userid;
    let response = await fetch(`${API}/feeding/`, {
      method: "POST",
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
    console.error("Error desde servicio feeding", error);
  }
};

export const updateFeeding = async (obj) => {
  console.log("Objeto en service Update Feeding: ", obj);
  try {
    let response = await fetch(`${API}/feeding/${obj._id}`, {
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
    console.error("Error desde servicio feeding", error);
  }
}

export const deleteFeeding = async (obj) => {
  console.log(obj);
  try {
    let response = await fetch(`${API}/feeding/${obj}`, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    let status = await response.status;
    if (status === 204) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error desde servicio feeding", error);
  }
}

export const getFeeding = async (type) => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  try {
    let userid = await SecureStore.getItemAsync("id");
    userid = userid.slice(1, -1);
    let response = await fetch(`${API}/feeding/${userid}`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        year,
        month,
        day
      },
      body: JSON.stringify(type),
    });
    let status = await response.status;
    if (status === 200 || status === 304) {
      let json = await response.json();
      return json;
    } else return false;
  } catch (error) {
    console.log("Error desde Feeding Service", error);
    return false;
  }
};

export const getTotalFeeding = async (type) => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  try {
    let userid = await SecureStore.getItemAsync("id");
    userid = userid.slice(1, -1);
    let response = await fetch(`${API}/feeding/total/${userid}/${type}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        year,
        month,
        day
      },
    });
    let status = await response.status;
    if (status === 200 || status === 304) {
      let json = await response.json();
      return json;
    } else return false;
  } catch (error) {
    console.log("Error desde Total Feeding Service", error);
    return false;
  }
};
