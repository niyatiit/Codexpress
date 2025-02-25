import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  console.log("token - ", token);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending token:", token);
    console.log("Sending newPassword:", newPassword);
  
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(`http://localhost:3000/auth/reset-password/${token}`, { newPassword });
      toast.success(data.message);
      setTimeout(() => navigate("/student/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth d-flex">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="auth-left bg-main-50 flex-center p-24">
        <img src="/assets/images/thumbs/auth-img3.png" alt="" />
      </div>
      <div className="auth-right pb-140 px-120 flex-center flex-column">
        <div className="auth-right__inner mx-auto w-100">
          <Link to="/" className="sidebar__logo py-40 position-sticky">
            <img src={logo} alt="Logo" className="h-32" />
          </Link>

          <h2 className="mb-8">Reset Password</h2>
          <p className="text-gray-600 text-15 mb-32">
            Enter your new password below to reset your account.
          </p>

          <form onSubmit={handleSubmit}>
            {/* New Password Input */}
            <div className="mb-24">
              <label htmlFor="newPassword" className="form-label mb-8 h6">
                New Password
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control py-11 ps-40 pe-50"
                  id="newPassword"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                  <i className="ph ph-lock"></i>
                </span>
                <span
                  className="position-absolute top-50 translate-middle-y end-0 me-16 cursor-pointer text-gray-600 d-flex"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`ph ${showPassword ? "ph-eye-slash" : "ph-eye"}`}></i>
                </span>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="mb-24">
              <label htmlFor="confirmPassword" className="form-label mb-8 h6">
                Confirm Password
              </label>
              <div className="position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control py-11 ps-40 pe-50"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                  <i className="ph ph-lock-key"></i>
                </span>
                <span
                  className="position-absolute top-50 translate-middle-y end-0 me-16 cursor-pointer text-gray-600 d-flex"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i className={`ph ${showConfirmPassword ? "ph-eye-slash" : "ph-eye"}`}></i>
                </span>
              </div>
            </div>

            {/* Reset Password Button */}
            <button
              type="submit"
              className="btn btn-main rounded-pill w-100"
              disabled={loading}
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Reset Password"
              )}
            </button>

            <Link
              to="/student/login"
              className="my-32 text-main-600 flex-align gap-8 justify-content-center"
            >
              <i className="ph ph-arrow-left d-flex"></i> Back To Login
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
