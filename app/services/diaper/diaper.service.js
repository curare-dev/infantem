import { API } from "../../utils/api";
import * as SecureStore from "expo-secure-store";

export const postDiaper = async (obj) => {
  try {
    let userid = await SecureStore.getItemAsync("id");
    userid = userid.slice(1, -1);
    obj.userId = userid;
    let response = await fetch(`${API}/diaper/`, {
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

export const getDiapers = async (type) => {
  try {
    let userid = await SecureStore.getItemAsync("id");
    userid = userid.slice(1, -1);
    let response = await fetch(`${API}/diaper/${userid}`, {
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
    console.log("Error desde Diaper Service", error);
    return false;
  }
};

export const updateDiaper = async (obj) => {
  console.log("Objeto en service Update Diaper: ", obj);
  try {
    let response = await fetch(`${API}/diaper/${obj._id}`, {
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
    console.error("Error desde servicio diaper", error);
  }
}

export const deleteDiaper = async (obj) => {
  console.log(obj);
  try {
    let response = await fetch(`${API}/diaper/${obj}`, {
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
    console.error("Error desde servicio Diaper", error);
  }
}

export const getTotalDiapers = async (type) => {
  try {
    let userid = await SecureStore.getItemAsync("id");
    userid = userid.slice(1, -1);
    let response = await fetch(`${API}/diaper/total/${userid}/${type}`, {
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
    console.log("Error desde Total Diaper Service", error);
    return false;
  }
};
