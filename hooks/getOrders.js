import { useState, useEffect } from "react";
import API from "../services/api";

export const useUserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [boughtCourses, setBoughtCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await API.get("/orders/");
        const userOrders = res.data || [];

        const paidOrders = userOrders.filter(order => order.status === "paid");

        setOrders(paidOrders);

        const courses = [
          ...new Set(
            paidOrders
              .map((order) => order.course)
              .filter((c) => c != null)
          ),
        ];

        setBoughtCourses(courses);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, boughtCourses, error, loading };
};