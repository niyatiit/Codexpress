import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import StudentDashboard2 from "./pages/student/home/StudentDashboard2";
import PrivateRoute from "./components/PrivateRoute";
import HomeTwo from "./pages/HomeTwo";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgetPassword from "./pages/auth/ForgetPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Faqs from "./pages/Faqs";
import NotFoundPage from "./pages/NotFoundPage";
import Payment from "./pages/Payment/Payment";
import FacultyLogin from "./pages/auth/FacultyLogin";
import FacultyRegister from "./pages/auth/FacultyRegister"
import AdminLogin from "./pages/auth/AdminLogin";
import ResetPassword from "./pages/auth/ResetPassword";
import ProfileCompletion from "./pages/ProfileCompletion";
import CourseDashboard from "./pages/CourseDashboard"
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import CancelPage from "./pages/Payment/CancelPage";

const App = () => {
  return (
    <Router>
      <div className="app-container flex">
        <main className="content w-full">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomeTwo />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/student/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/faq" element={<Faqs />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/profile-completion" element={<ProfileCompletion />} />
            <Route path="/courses/:id/payment" element={<Payment />} />
            <Route path="/courses/:id/dashboard" element={<CourseDashboard />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<CancelPage />} />

            {/* Role-Specific Login Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/faculty/login" element={<FacultyLogin />} />
            <Route path="/faculty/register" element={<FacultyRegister />} />

            {/* Private Routes for Role-Based Access */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} fallbackPath="/admin/login" />}>
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={["faculty"]} fallbackPath="/faculty/login" />}>
              <Route path="/faculty/*" element={<FacultyDashboard />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={["student"]} fallbackPath="/student/login" />}>
              <Route path="/student/*" element={<StudentDashboard2 />} />
              <Route path="/courses/:id/payment" element={<Payment />} />
            </Route>

            {/* 404 Not Found Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;