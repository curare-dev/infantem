import * as SecureStore from "expo-secure-store";

export const closeSession = async () => {
  await SecureStore.deleteItemAsync("token");
};
