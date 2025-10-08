import { useState, useEffect } from "react"
import API from "../services/api"

export const getCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get("/courses/courses/");
        setCourses(response.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError(err);
      }
    };

    fetchCourses();
  }, [])

  return { courses, coursesError: error }
}