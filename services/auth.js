import API from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerUser = async (username, email, telegram, password) => {
  await API.post("/users/register/", { username, email, telegram, password });
};

export const loginUser = async (username, password) => {
  const { data } = await API.post("/users/login/", { username, password });

  await AsyncStorage.setItem("access_token", data.access);
  await AsyncStorage.setItem("refresh_token", data.refresh);

  return data;
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem("access_token");
  await AsyncStorage.removeItem("refresh_token");
};

export const getUser = async () => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    if (!token) throw new Error("No token found");

   const res = await API.get("/users/me/");

    return res.data;
  } catch (err) {
    console.error("getUser failed:", err);
    throw err;
  }
};