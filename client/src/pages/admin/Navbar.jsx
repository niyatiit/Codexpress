import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("user"));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="top-navbar flex-between py-3   gap-16">
      <div className="flex-align gap-16">
        {/* Toggle Button Start */}
        <button type="button" className="toggle-btn d-xl-none d-flex text-26 text-gray-500">
          <i className="ph ph-list"></i>
        </button>
        {/* Toggle Button End */}

        {/* Search Bar */}
        <form action="#" className="w-350 d-sm-block d-none">
          <div className="position-relative">
            <input
              type="text"
              className="form-control ps-40 h-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15"
              placeholder="Search..."
            />
          </div>
        </form>
      </div>

      <div className="flex-align gap-16">

        {/* Profile Dropdown */}
        <div className="relative border-[1px] rounded-[100px] py-[7px] hover:bg-zinc-200 transition">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 px-2 focus:outline-none"
          >
            <img
              src={
                admin.profile_picture ||
                "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
            <span className="text-blue-500 font-medium">
              @{admin.username || "User"}
            </span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-full bg-white rounded-lg shadow-lg border border-gray-200 ">
              <div className="py-2">
                <Link
                  to="/admin"
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/edit-profile"
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
      </div>
    </div>
  );
};

export default Navbar;