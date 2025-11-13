import { useState } from "react";
import API from "../services/api";

export const useCreateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [orderError, setOrderError] = useState(null);

  const createOrder = async (courseId, imageUri) => {
    if (!courseId) throw new Error("courseId is required");
    if (!imageUri) throw new Error("imageUri is required");

    setIsLoading(true);
    setOrderError(null);

    try {
      const blob = await fetch(imageUri).then((res) => res.blob());

      const fileName = "invoice.jpg";
      const fileType = "image/jpeg";

      const file = new File([blob], fileName, { type: fileType });

      const formData = new FormData();
      formData.append("course", String(courseId));
      formData.append("invoice", file);

      const response = await API.post("/orders/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setOrder(response.data);
      return response.data;
    } catch (err) {
      console.log("UPLOAD ERROR:", err);
      setOrderError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrder, order, orderError, isLoading };
};