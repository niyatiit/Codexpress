import React from "react";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgetPassword from "./pages/auth/ForgetPassword";
import StudentDashboard from "./pages/student/home/StudentDashboard";
import Home from "./pages/Home";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFoundPage from "./pages/NotFoundPage";
import HomeTwo from "./pages/HomeTwo";
import Courses from "./pages/Courses";
import Faqs from "./pages/Faqs";
import StudentDashboard2 from "./pages/student/home/StudentDashboard2";

const App = () => {
  return (
    <Router>
      <div className="app-container flex">
        <main className="content w-full">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<HomeTwo />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgetPassword/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/faq" element={<Faqs />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/admin/*" element={<AdminDashboard />} /> {/* Use wildcard for sub-routes */}
            <Route path="/faculty/*" element={<FacultyDashboard />} /> 
            <Route path="/student/*" element={<StudentDashboard2 />} /> {/* Use wildcard for sub-routes */}
            <Route path="*" element={<NotFoundPage/>} /> {/* Use wildcard for sub-routes */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
