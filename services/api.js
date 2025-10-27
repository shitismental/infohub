import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.API_URL;

const API = axios.create({
  baseURL: API_URL,
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

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          addRefreshSubscriber((token) => {
            if (!token) reject(error);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(API(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("No refresh token found");

        const { data } = await axios.post(`${API_URL}/users/token/refresh/`, {
          refresh: refreshToken,
        });

        await AsyncStorage.setItem("access_token", data.access);

        API.defaults.headers.Authorization = `Bearer ${data.access}`;
        onRefreshed(data.access);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return API(originalRequest);
      } catch (err) {
        isRefreshing = false;
        onRefreshed(null);

        console.error("Token refresh failed:", err);

        await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;