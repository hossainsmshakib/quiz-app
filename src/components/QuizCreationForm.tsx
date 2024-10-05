import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createQuiz } from "../store/quizSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

interface Question {
  id: number;
  text: string;
  type: "MCQ" | "TrueFalse";
  options: string[];
}

const QuizCreationForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState("");

  const handleAddQuestion = (type: "MCQ" | "TrueFalse") => {
    const newQuestion: Question = {
      id: questions.length + 1,
      text: "",
      type,
      options: type === "MCQ" ? ["", "", "", ""] : ["True", "False"],
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    value: string
  ) => {
    const updatedQuestions = questions.map((q, i) => {
      if (i === qIndex) {
        const updatedOptions = q.options.map((opt, j) =>
          j === oIndex ? value : opt
        );
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleCreateQuiz = async () => {
    if (!title || timeLimit <= 0 || questions.some((q) => !q.text)) {
      setError("Please fill in all fields correctly.");
      return;
    }
    const formattedQuestions = questions.map((q) => ({
      ...q,
      id: q.id.toString(),
    }));
    const newQuiz = {
      id: uuidv4(),
      title,
      timeLimit,
      questions: formattedQuestions,
      status: "inactive",
    };

    try {
      await axios.post("http://localhost:5001/quizzes", newQuiz);
      dispatch(createQuiz(newQuiz));
      navigate("/teacher");
    } catch (error) {
      console.error("Error creating quiz:", error);
      setError("Failed to create quiz. Please try again.");
    }
  };

  const handlePreviewQuiz = () => {
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
        <h1 className="text-3xl font-bold text-white">Create New Quiz</h1>
        <button
          onClick={handleCreateQuiz}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-300 text-base"
        >
          Create Quiz
        </button>
      </div>
      <div className="flex-1 mt-24 overflow-hidden">
        <div className="h-full p-6 overflow-y-auto">
          {error && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
              role="alert"
            >
              <p>{error}</p>
            </div>
          )}

          {/* Form Content */}
          <div className="max-w-4xl mx-auto">
            {/* Quiz Title */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Quiz Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                placeholder="Enter quiz title"
              />
            </div>

            {/* Time Limit */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Time Limit (minutes)
              </label>
              <input
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                placeholder="Enter time limit"
              />
            </div>

            {/* Questions Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Questions
              </h2>
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => handleAddQuestion("MCQ")}
                  className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300"
                >
                  Add MCQ
                </button>
                <button
                  onClick={() => handleAddQuestion("TrueFalse")}
                  className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition duration-300"
                >
                  Add True/False
                </button>
              </div>
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="mb-6 p-4 bg-white rounded-lg shadow"
                >
                  <input
                    type="text"
                    placeholder="Question text"
                    value={question.text}
                    onChange={(e) =>
                      handleQuestionChange(index, "text", e.target.value)
                    }
                    className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                  />
                  {question.options.map((option, oIndex) => (
                    <input
                      key={oIndex}
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, oIndex, e.target.value)
                      }
                      className="w-full px-4 py-2 mb-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    />
                  ))}
                  <button
                    onClick={() => handleDeleteQuestion(index)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-300"
                  >
                    Delete Question
                  </button>
                </div>
              ))}
            </div>

            {/* Preview Button */}
            <div className="text-center">
              <button
                onClick={handlePreviewQuiz}
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition duration-300"
              >
                Preview Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-2xl w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Quiz Preview
            </h2>
            <p className="mb-2 text-lg">
              <strong>Title:</strong> {title}
            </p>
            <p className="mb-4 text-lg">
              <strong>Time Limit:</strong> {timeLimit} minutes
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Questions:
            </h3>
            {questions.map((question) => (
              <div key={question.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-lg mb-2">{question.text}</p>
                <ul className="list-disc pl-5">
                  {question.options.map((option, index) => (
                    <li key={index} className="text-base mb-1">
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button
              onClick={closePreview}
              className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-300"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizCreationForm;
