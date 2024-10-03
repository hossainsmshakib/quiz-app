import React from "react";
import TeacherPanel from "../components/TeacherPanel";

const TeacherPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ed7b49]">
      <div className="bg-[#ed7b49] rounded-lg p-6 w-full max-w-3xl">
       {/*  <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Teacher Panel
        </h1> */}
        <TeacherPanel />
      </div>
    </div>
  );
};

export default TeacherPage;
