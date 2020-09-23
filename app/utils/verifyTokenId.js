import * as SecureStore from "expo-secure-store";

export const verifyTokenId = async () => {
  const response = await SecureStore.getItemAsync("token");
  if (response === null) {
    return false;
  } else {
    return true;
  }
};
