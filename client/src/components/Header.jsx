import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/student/login");
  };
  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white shadow-lg w-full">
      <div className="fixed top-0 left-0 w-full z-50">
        <nav className="container header-nav mx-auto px-5 flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-28" />
            </Link>
          </div>

          {/* Main Navigation Menu */}
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

          {/* Right-side Navbar Options */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Profile Dropdown */}
                <div className="relative border-[1px] rounded-[100px] py-[7px] hover:bg-zinc-200 transition">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 px-2 focus:outline-none"
                  >
                    <img
                      src={
                        user.profile_picture ||
                        "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                      }
                      alt="Profile"
                      className="w-32 h-32 rounded-full"
                    />
                    <span className="text-blue-500 font-medium">
                      @{user.username || "User"}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-full bg-white rounded-lg shadow-lg border border-gray-200 ">
                      <div className="py-2">
                        <Link
                          to="/profile-completion"
                          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/student/login"
                  className="px-4 py-2 rounded-3xl text-sm border-2 border-blue-500 text-blue-500 font-medium hover:text-blue-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-3xl text-md font-medium bg-blue-500 text-white hover:bg-blue-800 transition-colors"
                >
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