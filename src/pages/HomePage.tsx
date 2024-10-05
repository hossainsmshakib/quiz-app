import React from "react";
import { Link } from "react-router-dom";
import quizImage from "../assets/image.png";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">
          Welcome to Onsite Quiz Platform
        </h1>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
          {/* Left Half with Image */}
          <div className="w-full md:w-1/2 max-w-md">
            <img
              src={quizImage}
              alt="Quiz Illustration"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>

          {/* Right Half with Buttons */}
          <div className="w-full md:w-1/2 max-w-md space-y-8">
            {/* Teacher Button Section */}
            <Link
              to="/teacher"
              className="block w-full bg-blue-500 text-white text-lg font-semibold py-4 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 text-center"
            >
              Teacher
            </Link>

            {/* Student Links */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Student Access
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {["A", "B", "C"].map((studentId) => (
                  <Link
                    key={studentId}
                    to={`/student/${studentId}`}
                    className="bg-purple-500 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                  >
                    Student {studentId}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
