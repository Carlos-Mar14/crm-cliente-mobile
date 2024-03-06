import { API_URL_SERVER } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const api = axios.create({
  baseURL: API_URL_SERVER,
});
const TOKEN_KEY = "token";

console.log(API_URL_SERVER)

async function saveToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;

  if (Platform.OS === "web") {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } else {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  }
}

async function getToken() {
  if (Platform.OS === "web") {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } else {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  }
}

async function removeToken() {
  delete api.defaults.headers.common.Authorization;

  if (Platform.OS === "web") {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
}

async function refreshToken() {
  const token = await getToken()
    const {data} =  await api.post("/token-refresh/", { token });
    await saveToken(data.token);
}

export { api, getToken, refreshToken, removeToken, saveToken };

