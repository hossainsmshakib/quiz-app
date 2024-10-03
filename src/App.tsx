import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeacherPage from "./pages/TeacherPage";
import StudentPage from "./pages/StudentPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/student/:id" element={<StudentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
