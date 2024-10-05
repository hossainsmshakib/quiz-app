import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import TeacherPanel from "../components/TeacherPanel";
import axios from "axios";
import { setQuizzes } from "../store/quizSlice";

const TeacherPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:5001/quizzes");
        dispatch(setQuizzes(response.data));
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <TeacherPanel />
    </div>
  );
};

export default TeacherPage;
