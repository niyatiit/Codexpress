import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Cookies from "js-cookie";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStudentEnrolled, setIsStudentEnrolled] = useState(false);
  const [isFaculty, setIsFaculty] = useState(false); // State to check if user is faculty
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null); // State to store user data
  const authUser = JSON.parse(localStorage.getItem("user"));

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(`http://localhost:3000/profile/${authUser.id}`);
      if (response.data.success) {
        setUser(response.data.user);
      }
    };
    fetchUserData();
  }, []);

  // Check if user is enrolled (for students) or is a faculty member
  useEffect(() => {
    const checkEnrollmentAndFaculty = async () => {
      const token = localStorage.getItem("token");
      if (authUser?.role === "student" && token) {
        try {
          const response = await axios.get("http://localhost:3000/student/check-enrollment", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsStudentEnrolled(response.data.isStudent && response.data.isEnrolled);
        } catch (error) {
          console.error("🚨 Error checking enrollment:", error);
        }
      } else if (authUser?.role === "faculty" && token) {
        try {
          // Call the backend endpoint to check if the user is a faculty member
          const response = await axios.get(`http://localhost:3000/users/faculty/${authUser.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // If faculty data is returned, set isFaculty to true
          if (response.data.user.length > 0) {
            setIsFaculty(true);
          }
        } catch (error) {
          console.error("🚨 Error checking faculty status:", error);
        }
      }
      setLoading(false);
    };
    checkEnrollmentAndFaculty();
  }, [authUser?.role, authUser?.id]);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    if (authUser.role === "student") navigate("/student/login");
    else if (authUser.role === "faculty") navigate("/faculty/login");
    else navigate("/admin/login");
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageError = (event) => {
    event.target.src = "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg";
  };

  return (
    <header className="bg-white shadow-lg w-full">
      <div className="fixed top-0 left-0 w-full z-50">
        <nav className="container header-nav mx-auto px-5 flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-28" />
            </Link>
          </div>
          <div className="hidden lg:block">
            <ul className="flex space-x-8">
              <li className="text-blue-500 hover:text-blue-800">
                <Link to="/">Home</Link>
              </li>
              <li className="text-blue-500 hover:text-blue-800">
                <Link to="/courses">Courses</Link>
              </li>
              <li className="text-blue-500 hover:text-blue-800">
                <Link to="/faq">FAQ</Link>
              </li>
              <li className="text-blue-500 hover:text-blue-800">
                <Link to="/about">About</Link>
              </li>
              <li className="text-blue-500 hover:text-blue-800">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <div ref={dropdownRef} className="relative border-[1px] rounded-[100px] py-[6px] hover:bg-blue-100 border-[1px] border-blue-500 transition">
                <button onClick={toggleDropdown} className="flex items-center gap-2 px-2 focus:outline-none">
                  <img
                    src={user?.profile_picture || "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"}
                    alt="Profile"
                    className="w-32 h-32 bg-blue-500 rounded-full"
                    onError={handleImageError}
                  />
                  <span className="text-blue-500 font-medium">@{user?.username || "User"}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-[150px] px-1 bg-white rounded-lg shadow-lg border border-gray-200">
                    <div className="py-2">
                      {isStudentEnrolled && (
                        <Link to={`/${authUser.role}`} className="block w-full px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-100 text-md text-left">
                          Dashboard
                        </Link>
                      )}
                      {isFaculty && (
                        <Link to="/faculty" className="block w-full px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-100 text-md text-left">
                          Dashboard
                        </Link>
                      )}
                      {authUser.role === "admin" && (
                        <Link to="/admin" className="block w-full px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-100 text-md text-left">
                          Dashboard
                        </Link>
                      )}
                      <Link to="/profile-completion" className="block w-full px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-100 text-md text-left">
                        Profile
                      </Link>
                      <button onClick={handleLogout} className="block w-full px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-blue-100 text-md text-left">
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/student/login" className="px-4 py-2 rounded-3xl text-sm border-2 border-blue-500 text-blue-500 font-medium hover:text-blue-800 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 rounded-3xl text-md font-medium bg-blue-500 text-white hover:bg-blue-800 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;