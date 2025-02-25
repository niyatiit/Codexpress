import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useCookies } from "react-cookie"; // Import react-cookie for cookie management

const FacultyRegister = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["user"]); // Initialize cookies
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear errors
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    // Username Validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    } else if (/\s/.test(formData.username)) {
      newErrors.username = "Username should not contain spaces.";
    } else if (!/^[a-z0-9]+$/.test(formData.username)) {
      newErrors.username = "Username should contain only lowercase letters and numbers.";
    } else if (/^\d+$/.test(formData.username)) {
      newErrors.username = "Username should not contain only numbers.";
    }

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    // Password Validation
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post("http://localhost:3000/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "faculty", // Set role to "faculty"
      });

      if (res.data.success) {
        // Store user data in localStorage (for session management)
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        // ✅ Handle "Remember Me"
        if (formData.rememberMe) {
          localStorage.setItem("rememberedEmail", formData.email);
          localStorage.setItem("rememberedPassword", formData.password);
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
        }

        alert("Registration Successful!");
        navigate("/faculty/dashboard"); // Redirect to faculty dashboard after successful signup

        // Reset form after submission
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          rememberMe: false,
        });
      } else {
        alert(res.data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Registration failed!");
    }
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
          <h2 className="mb-8">Faculty Sign Up</h2>
          <p className="text-gray-600 text-15 mb-32">
            Please sign up to your account and start the adventure
          </p>

          <form onSubmit={handleSubmit}>
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
              {errors.username && (
                <p className="error-text text-red-500">{errors.username}</p>
              )}
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
              {errors.email && <p className="error-text text-red-500">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="mb-24">
              <label htmlFor="password" className="form-label mb-8 h6">
                Password
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control py-11 ps-40"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <span
                  className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`ph ph-eye${showPassword ? "" : "-slash"}`}></i>
                </span>
                <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                  <i className="ph ph-lock"></i>
                </span>
              </div>
              {errors.password && (
                <p className="error-text text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-24">
              <label htmlFor="confirmPassword" className="form-label mb-8 h6">
                Confirm Password
              </label>
              <div className="position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control py-11 ps-40"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <span
                  className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i className={`ph ph-eye${showConfirmPassword ? "" : "-slash"}`}></i>
                </span>
                <span className="position-absolute top-50 translate-middle-y ms-16 text-gray-600 d-flex">
                  <i className="ph ph-lock"></i>
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="error-text text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="mb-32 flex items-center gap-8">
              <div className="form-check flex items-center w-full justify-center">
                <input
                  className="form-check-input flex-shrink-0 rounded-4"
                  type="checkbox"
                  name="rememberMe"
                  id="remember"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <label
                  className="form-check-label text-15 p-0 ml-2 pt-2" // Added margin-left for spacing
                  htmlFor="remember"
                >
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
              <Link
                to="/faculty/login"
                className="text-main-600 hover-text-decoration-underline pl-2"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FacultyRegister;