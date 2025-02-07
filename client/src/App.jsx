import React from "react";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgetPassword from "./pages/auth/ForgetPassword";
import StudentDashboard from "./pages/student/home/StudentDashboard";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <div className="app-container flex">
        <main className="content w-full p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgetPassword/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/*" element={<AdminDashboard />} /> {/* Use wildcard for sub-routes */}
            <Route path="/student/*" element={<StudentDashboard />} /> {/* Use wildcard for sub-routes */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
