import React from "react";
import { useParams } from "react-router-dom";
import StudentInterface from "../components/StudentInterface";

const StudentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ed7b49]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Student Interface
        </h1>
        <StudentInterface studentId={id || ""} />
      </div>
    </div>
  );
};

export default StudentPage;
