import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Register = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '', // 'faculty' or 'student'
    rememberMe: false,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // You can add your form submission logic here (e.g., API call)
  };

  return (
    <section className="auth d-flex gap-90">
      <div className="auth-left bg-main-50 flex-center justify-between">
        <img src="assets/images/thumbs/auth-img2.png" alt="" />
      </div>
      <div className="auth-right py-40 px-24 flex-center flex-column">
        <div className="auth-right__inner mx-auto w-100">
          <Link to="/" className="sidebar__logo py-40 position-sticky">
            <img src={logo} alt="Logo" className="h-32" />
          </Link>
          <h2 className="mb-8">Sign Up</h2>
          <p className="text-gray-600 text-15 mb-32">
            Please sign up to your account and start the adventure
          </p>

          <form onSubmit={handleSubmit}>
            {/* Role Selection (Styled as Buttons) */}
            <div className="mb-20">
              <label className="form-label mb-8 h6">Register As</label>
              <div className="d-flex gap-16">
                <label
                  className={`role-button ${
                    formData.role === 'faculty' ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="faculty"
                    checked={formData.role === 'faculty'}
                    onChange={handleInputChange}
                  />
                  Faculty
                </label>
                <label
                  className={`role-button ${
                    formData.role === 'student' ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === 'student'}
                    onChange={handleInputChange}
                  />
                  Student
                </label>
              </div>
            </div>

            {/* Username Field */}
            <div className="mb-24">
              <label htmlFor="username" className="form-label mb-8 h6">
                Username
              </label>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control py-11 ps-40"
                  id="username"
                  name="username"
                  placeholder="Type your username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                  <i className="ph ph-user"></i>
                </span>
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-24">
              <label htmlFor="email" className="form-label mb-8 h6">
                Email
              </label>
              <div className="position-relative">
                <input
                  type="email"
                  className="form-control py-11 ps-40"
                  id="email"
                  name="email"
                  placeholder="Type your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                  <i className="ph ph-envelope"></i>
                </span>
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-24">
              <label htmlFor="current-password" className="form-label mb-8 h6">
                Password
              </label>
              <div className="position-relative">
                <input
                  type="password"
                  className="form-control py-11 ps-40"
                  id="current-password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <span className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y ph ph-eye-slash"></span>
                <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                  <i className="ph ph-lock"></i>
                </span>
              </div>
              <span className="text-gray-900 text-15 mt-4">
                Must be at least 8 characters
              </span>
            </div>

            {/* Remember Me Checkbox */}
            <div className="mb-32 flex-between flex-wrap gap-8">
              <div className="form-check mb-0 flex-shrink-0">
                <input
                  className="form-check-input flex-shrink-0 rounded-4"
                  type="checkbox"
                  name="rememberMe"
                  id="remember"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <label className="form-check-label text-15 flex-grow-1" htmlFor="remember">
                  Remember Me
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-main rounded-pill w-100">
              Sign Up
            </button>

            {/* Login Link */}
            <p className="mt-32 text-gray-600 text-center">
              Already have an account?
              <Link to="/login" className="text-main-600 hover-text-decoration-underline">
                Log In
              </Link>
            </p>

            {/* Divider */}
            <div className="divider my-32 position-relative text-center">
              <span className="divider__text text-gray-600 text-13 fw-medium px-26 bg-white">
                or
              </span>
            </div>

            {/* Social Login Buttons */}
            <ul className="flex-align gap-10 flex-wrap justify-content-center">
              <li>
                <a
                  href="https://www.facebook.com/"
                  className="w-38 h-38 flex-center rounded-6 text-facebook-600 bg-facebook-50 hover-bg-facebook-600 hover-text-white text-lg"
                >
                  <i className="ph-fill ph-facebook-logo"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com/"
                  className="w-38 h-38 flex-center rounded-6 text-twitter-600 bg-twitter-50 hover-bg-twitter-600 hover-text-white text-lg"
                >
                  <i className="ph-fill ph-twitter-logo"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/"
                  className="w-38 h-38 flex-center rounded-6 text-google-600 bg-google-50 hover-bg-google-600 hover-text-white text-lg"
                >
                  <i className="ph ph-google-logo"></i>
                </a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;