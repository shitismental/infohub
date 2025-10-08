import { useState, useEffect } from "react"
import API from "../services/api"

export const getLesson = (lessonId) => {
  const [lesson, setLesson] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await API.get(`/courses/lessons/${lessonId}`);
        setLesson(response.data);
      } catch (err) {
        console.error("Failed to fetch lessons:", err);
        setError(err);
      }
    };

    fetchLessons();
  }, [])

  return { lesson, lessonError: error }
}