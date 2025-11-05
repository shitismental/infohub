// hooks/useGetCourses.js
import { useState, useEffect } from "react";
import API from "../services/api";

export const useGetCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/courses/courses/");
        setCourses(data?.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);  // ← ALWAYS SET FALSE
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, coursesError: error }; // ← RETURN LOADING
};