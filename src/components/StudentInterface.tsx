import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { submitQuiz } from "../store/quizSlice";
import QuizTimer from "./QuizTimer";
import { Quiz, Question } from "../types/Quiz";
import { useNavigate } from "react-router-dom";

interface StudentInterfaceProps {
  studentId: string;
}

const StudentInterface: React.FC<StudentInterfaceProps> = ({ studentId }) => {
  const quiz: Quiz | undefined = useSelector(
    (state: RootState) => state.quiz.quizzes[0]
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleAutoSubmit = () => {
    if (quiz) {
      dispatch(submitQuiz({ quizId: quiz.id, answers }));
      navigate("/");
    }
  };

  useEffect(() => {
    if (quiz?.status === "ended") {
      handleAutoSubmit();
    }
  }, [quiz?.status]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    if (quiz) {
      dispatch(submitQuiz({ quizId: quiz.id, answers }));
      navigate("/");
    }
  };

  if (quiz?.status !== "active") {
    return (
      <div className="text-center text-red-600 mt-4">Quiz is not active.</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
      <div className="mb-6">
        <QuizTimer timeLimit={quiz.timeLimit} onTimeUp={handleAutoSubmit} />
      </div>

      <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
        {quiz.title}
      </h1>

      <div className="space-y-6">
        {quiz.questions.map((question: Question) => (
          <div key={question.id} className="border-b pb-4">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              {question.text}
            </p>
            <div className="flex flex-col space-y-2">
              {question.options.map((option: string) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    onChange={() => handleAnswerChange(question.id, option)}
                    className="form-radio text-blue-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default StudentInterface;
