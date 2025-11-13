import { useState } from "react";
import API from "../services/api";

export const useCreateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [orderError, setOrderError] = useState(null);

  /**
   * @param {number} courseId
   * @param {string} invoiceUri
   */

  const createOrder = async (courseId, invoiceUri) => {
    if (!courseId) throw new Error("courseId is required");
    if (!invoiceUri) throw new Error("invoiceUri is required");

    setIsLoading(true);
    setOrderError(null);

    try {
      const formData = new FormData();

      formData.append("course", String(courseId));

      const fileName = invoiceUri.split("/").pop() || "receipt.jpg";
      const fileType = invoiceUri.includes(".png") ? "image/png" : "image/jpeg";

      formData.append("invoice", {
        uri: invoiceUri,
        name: fileName,
        type: fileType,
      });

      const response = await API.post("/orders/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setOrder(response.data);
      return response.data;
    } catch (err) {
      setOrderError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrder, order, orderError, isLoading };
};