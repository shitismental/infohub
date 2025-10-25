import { useState } from "react";
import API from "../services/api";

export const useCreateOrder = () => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const createOrder = async (courseId) => {
    try {
      const response = await API.post("/orders/create/", { course: courseId });
      setOrder(response.data);
      return response.data;
    } catch (err) {
      setError(err);
    }
  };

  return { createOrder, order, orderError: error };
};