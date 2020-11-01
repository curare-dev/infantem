import { API } from "../../utils/api";
import * as SecureStore from "expo-secure-store";

export const postDreaming = async (obj) => {
  try {
    let userid = await SecureStore.getItemAsync("id");
    userid = userid.slice(1, -1);
    obj.userId = userid;
    let response = await fetch(`${API}/dreaming/`, {
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
    console.error("Error desde servicio Dreaming", error);
  }
};

export const updateDreaming = async (obj) => {
  console.log("Objeto en service Update Dreaming: ", obj);
  try {
    let response = await fetch(`${API}/dreaming/${obj._id}`, {
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
    console.error("Error desde servicio Dreaming", error);
  }
}

export const deleteDreaming = async (obj) => {
  console.log(obj);
  try {
    let response = await fetch(`${API}/dreaming/${obj}`, {
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
    console.error("Error desde servicio Dreaming", error);
  }
}

export const getDreaming = async (type) => {
  try {
    let userid = await SecureStore.getItemAsync("id");
    userid = userid.slice(1, -1);
    let response = await fetch(`${API}/dreaming/${userid}`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(type),
    });
    let status = await response.status;
    if (status === 200 || status === 304) {
      let json = await response.json();
      return json;
    } else return false;
  } catch (error) {
    console.log("Error desde Dreaming Service", error);
    return false;
  }
};

export const getTotalDreaming = async (type) => {
  try {
    let userid = await SecureStore.getItemAsync("id");
    userid = userid.slice(1, -1);
    let response = await fetch(`${API}/dreaming/total/${userid}/${type}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    let status = await response.status;
    if (status === 200 || status === 304) {
      let json = await response.json();
      return json;
    } else return false;
  } catch (error) {
    console.log("Error desde Total Dreaming Service", error);
    return false;
  }
};
