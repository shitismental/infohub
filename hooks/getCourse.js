import { useState, useEffect } from "react"
import API from "../services/api"

export const getCourse = (id) => {
  const [course, setCourse] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get(`/courses/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        console.error("Failed to fetch course:", err);
        setError(err);
      }
    };

    fetchCourses();
  }, [])

  return { course, courseError: error }
}