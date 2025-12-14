import { useState, useEffect } from "react"
import API from "../services/api"

export const useGetCourse = (id) => {
  const [course, setCourse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true)
        const response = await API.get(`/courses/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [])

  return { course, loading, courseError: error }
}