import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.API_URL;

const API = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// --- Request interceptor: attach access token ---
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

// --- Response interceptor: handle token refresh ---
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("No refresh token found");

        // Refresh the token
        const { data } = await axios.post(`${API_URL}/users/token/refresh/`, {
          refresh: refreshToken,
        });

        // Save new token
        await AsyncStorage.setItem("access_token", data.access);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Clear storage and optionally redirect to login
        await AsyncStorage.removeItem("access_token");
        await AsyncStorage.removeItem("refresh_token");

        // Optionally: redirect to login if you're using Expo Router
        // import { router } from "expo-router";
        // router.replace("/login");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;