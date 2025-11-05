import { useState, useEffect } from "react"
import API from "../services/api"

export const useGetCourse = (id) => {
  const [course, setCourse] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await API.get(`/courses/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        setError(err);
        throw err;
      }
    };

    fetchCourse();
  }, [])

  return { course, courseError: error }
}