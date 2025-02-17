import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange =  (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error on input change
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
   
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Form Submitted:", formData);
  
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
  
      console.log(res.data);
      alert("Registration Successful!");
  
      // Reset form
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "student",
        rememberMe: false,
      });
  
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
          <h2 className="mb-8">Sign Up</h2>
          <p className="text-gray-600 text-15 mb-32">
            Please sign up to your account and start the adventure
          </p>

          <form onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="mb-20">
              <label className="form-label mb-8 h6">Register As</label>
              <div className="d-flex gap-16">
                {["faculty", "student"].map((role) => (
                  <label
                    key={role}
                    className={`role-button ${
                      formData.role === role ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={formData.role === role}
                      onChange={handleInputChange}
                    />
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </label>
                ))}
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
              {errors.username && (
                <p className="error-text">{errors.username}</p>
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
              {errors.email && <p className="error-text">{errors.email}</p>}
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
                <p className="error-text">{errors.password}</p>
              )}
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
                <label
                  className="form-check-label text-15 flex-grow-1"
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
                to="/login"
                className="text-main-600 hover-text-decoration-underline"
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

export default Register;
