import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from '../../assets/logo.png';

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:3000/auth/forgot-password`, { email });
      if (response.data.success) {
        toast.success("Password reset link sent to your email!");
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Failed to send reset link.");
      } else if (error.request) {
        toast.error("No response from the server. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth d-flex">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="auth-left bg-main-50 flex-center p-24">
        <img src="/assets/images/thumbs/auth-img3.png" alt="" />
      </div>
      <div className="auth-right pb-140 px-120 flex-center flex-column">
        <div className="auth-right__inner mx-auto w-100">
          <Link to="/" className="sidebar__logo py-40 position-sticky">
            <img src={logo} alt="Logo" className="h-32" />
          </Link>

          <h2 className="mb-8">Forgot Password?</h2>
          <p className="text-gray-600 text-15 mb-32">
            Lost your password? Please enter your email address. You will
            receive a link to create a new password via email.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-24">
              <label htmlFor="email" className="form-label mb-8 h6">
                Email{" "}
              </label>
              <div className="position-relative">
                <input
                  type="email"
                  className="form-control py-11 ps-40"
                  id="email"
                  placeholder="Type your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                />
                <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                  <i className="ph ph-envelope"></i>
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-main rounded-pill w-100"
              disabled={loading}
              aria-label="Send reset link"
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Send Reset Link"
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

export default ForgetPassword;