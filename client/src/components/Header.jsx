import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  

  return (
    <header className="bg-white shadow-lg">
      <div className="fixed top-0 left-0 w-full z-50">
        <nav className="container  header-nav  header-nav mx-auto px-5 flex justify-between items-center">
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
            {/* Uncomment the button below if you wish to enable  mode toggling */}
            {/*
            <button
              onClick={toggleMode}
              className="px-3 py-2 rounded-3xl text-sm font-medium hover:text-blue-900 :hover:text-blue-800 focus:outline-none"
            >
              {Mode ? "Light Mode" : " Mode"}
            </button>
            */}
            <Link
              to="/login"
              className="px-4 py-2 rounded-3xl text-sm border-2 border-blue-500 text-blue-500 font-medium hover:text-blue-800 transition-colors"
            >
              Signin
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-3xl text-md font-medium bg-blue-500 text-white  hover:bg-blue-800 transition-colors"
            >
              Signup
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
