import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoUpload from "./components/VideoUpload";
import QuizList from "./components/QuizList";
import QuizStudentView from "./components/QuizStudentView";
import Register from "./components/Register";
import Login from "./components/Login";
import Unauthorized from "./components/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<QuizStudentView />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Admin Routes */}
          <Route
            path="/upload"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <VideoUpload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quizzes"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <QuizList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
