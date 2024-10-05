import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activateQuiz, endQuiz } from "../store/quizSlice";
import { RootState } from "../store/store";

const TeacherPanel = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector((state: RootState) => state.quiz.quizzes);
  const navigate = useNavigate();
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  const handleActivateQuiz = (quizId: string) => {
    dispatch(activateQuiz(quizId));
  };

  const handleEndQuiz = (quizId: string) => {
    dispatch(endQuiz(quizId));
  };

  const handleNavigateToQuizCreation = () => {
    navigate("/quiz/create");
  };

  const handleQuizSelect = (quizId: string) => {
    setSelectedQuiz(quizId);
  };

  const selectedQuizDetails = quizzes.find((quiz) => quiz.id === selectedQuiz);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Teacher Panel</h1>
        <button
          onClick={handleNavigateToQuizCreation}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
        >
          + Add New Quiz
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Quiz List */}
        <div className="w-1/3 p-6 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Available Quizzes
          </h2>
          <div className="space-y-4 pr-4">
            {quizzes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No quizzes available</p>
                <button
                  onClick={handleNavigateToQuizCreation}
                  className="mt-4 text-blue-500 hover:text-blue-600 font-medium"
                >
                  Create your first quiz
                </button>
              </div>
            ) : (
              quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className={`p-5 bg-white border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedQuiz === quiz.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => handleQuizSelect(quiz.id)}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {quiz.title}
                  </h3>
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <span className="flex items-center">
                      <span className="mr-2">⏱</span>
                      {quiz.timeLimit} minutes
                    </span>
                  </div>
                  <div className="flex justify-between mt-4 gap-2">
                    <button
                      className={`flex-1 px-4 py-2 font-semibold text-sm rounded-lg transition-all duration-300 ${
                        quiz.status === "active"
                          ? "bg-green-100 text-green-700 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-105"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActivateQuiz(quiz.id);
                      }}
                      disabled={quiz.status === "active"}
                    >
                      {quiz.status === "active" ? "Active" : "Activate"}
                    </button>
                    <button
                      className={`flex-1 px-4 py-2 font-semibold text-sm rounded-lg transition-all duration-300 ${
                        quiz.status === "ended"
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 text-white transform hover:scale-105"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEndQuiz(quiz.id);
                      }}
                      disabled={quiz.status === "ended"}
                    >
                      {quiz.status === "ended" ? "Ended" : "End Quiz"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Content - Selected Quiz Details */}
        <div className="w-2/3 p-6 overflow-y-auto bg-white">
          {selectedQuizDetails ? (
            <div>
              <div className="pb-4 border-b border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {selectedQuizDetails.title}
                </h2>
                <div className="flex space-x-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {selectedQuizDetails.timeLimit} minutes
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedQuizDetails.status === "active"
                        ? "bg-green-100 text-green-700"
                        : selectedQuizDetails.status === "ended"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {selectedQuizDetails.status.charAt(0).toUpperCase() +
                      selectedQuizDetails.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Questions Section */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Questions
                </h3>
                <div className="space-y-4">
                  {selectedQuizDetails.questions &&
                  selectedQuizDetails.questions.length > 0 ? (
                    selectedQuizDetails.questions.map((question, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                            {index + 1}
                          </span>
                          <p className="text-gray-800">{question.text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No questions added yet.</p>
                      <button
                        onClick={handleNavigateToQuizCreation}
                        className="mt-4 text-blue-500 hover:text-blue-600 font-medium"
                      >
                        Add questions
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-4">
                  Select a quiz to see the details
                </p>
                <div className="w-16 h-1 bg-gray-200 mx-auto rounded-full"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherPanel;
