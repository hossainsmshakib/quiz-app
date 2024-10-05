import React from "react";
import { useParams } from "react-router-dom";
import StudentInterface from "../components/StudentInterface";

const StudentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">
              Student Dashboard
            </h1>
          </div>
          <div className="p-6 sm:p-8">
            <div className="bg-gray-100 rounded-lg p-6 mb-8 shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome, Student #{id}
              </h2>
              <p className="text-gray-600">
                Access your quizzes and track your progress here.
              </p>
            </div>
            <StudentInterface studentId={id || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
