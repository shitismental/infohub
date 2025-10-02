import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  baseURL: "http://152.53.18.199/api",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("access_token");

  const publicPaths = ["/users/login/", "/users/register/"];

  if (token && !publicPaths.some((path) => config.url.includes(path))) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default API;