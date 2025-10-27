import { useState } from "react";
import API from "../services/api";

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);

  const updateUser = async (data) => {
    setLoading(true);
    try {
      const response = await API.patch("/users/me/", data);
      return response.data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading };
};