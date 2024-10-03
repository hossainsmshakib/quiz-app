import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#ed7b49] from-blue-500 to-blue-300">
      <h1 className="text-4xl font-bold text-white mb-8">
        Welcome to Onsite Quiz Platform
      </h1>
      <Link
        to="/teacher"
        className="bg-white text-blue-500 font-semibold py-3 px-6 rounded-md shadow-md hover:bg-blue-100 transition duration-200 ease-in-out"
      >
        Teacher
      </Link>
      <div className="flex space-x-4 mt-4">
        {["A", "B", "C"].map((studentId) => (
          <Link
            key={studentId}
            to={`/student/${studentId}`}
            className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-100 transition duration-200 ease-in-out"
          >
            Student {studentId}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
