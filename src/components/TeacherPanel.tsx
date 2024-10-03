import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activateQuiz, endQuiz } from "../features/quiz/quizActions";
import { selectQuizStatus } from "../features/quiz/quizSelectors";

const TeacherPanel = () => {
  const dispatch = useDispatch();
  const quizStatus = useSelector(selectQuizStatus);
  const navigate = useNavigate();

  const handleActivateQuiz = () => {
    dispatch(activateQuiz());
  };

  const handleEndQuiz = () => {
    dispatch(endQuiz());
  };

  const handleNavigateToQuizCreation = () => {
    navigate("/quiz/create");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Teacher Panel
      </h1>

      <div className="flex justify-center space-x-4">
        <button
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
          onClick={handleActivateQuiz}
        >
          Activate Quiz
        </button>
        <button
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
          onClick={handleEndQuiz}
        >
          End Quiz
        </button>
        <button
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
          onClick={handleNavigateToQuizCreation}
        >
          Create Quiz
        </button>
      </div>

      <div className="text-center mt-4">
        <span className="text-lg font-medium text-gray-700">Quiz Status:</span>{" "}
        <span
          className={`${
            quizStatus === "active"
              ? "text-green-500"
              : quizStatus === "ended"
              ? "text-red-500"
              : "text-yellow-500"
          } font-bold`}
        >
          {quizStatus.charAt(0).toUpperCase() + quizStatus.slice(1)}
        </span>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold text-gray-800 text-center">
          Students
        </h2>
        <div className="flex justify-center space-x-2 mt-4">
          {["Student A", "Student B", "Student C"].map((student) => (
            <button
              key={student}
              className={`px-4 py-2 rounded-lg ${
                quizStatus === "active"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white font-semibold shadow-md transition duration-200`}
              disabled={quizStatus !== "active"}
            >
              {student}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TeacherPanel;
