import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin")); // Fetch admin data from localStorage

  const handleLogout = () => {
    Cookies.remove("token"); // Remove the token from cookies
    localStorage.removeItem("user"); // Remove user data from localStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="top-navbar flex-between py-0 gap-16">
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
        {/* Admin Profile Dropdown */}
        <div className="dropdown">
          <button
            className="users arrow-down-icon border border-gray-200 rounded-pill p-4 d-inline-block pe-40 position-relative"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="position-relative">
              <img
                src={admin?.profile_picture || "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"} // Use admin's profile picture or a placeholder
                alt="Admin"
                className="h-32 w-32 rounded-circle"
              />
              <span className="activation-badge w-8 h-8 position-absolute inset-block-end-0 inset-inline-end-0"></span>
            </span>
          </button>
          <div className="dropdown-menu dropdown-menu--lg border-0 bg-transparent p-0">
            <div className="card border border-gray-100 rounded-12 box-shadow-custom">
              <div className="card-body p-0">
                <div className="max-h-270 overflow-y-auto scroll-sm">
                  <ul className="p-24">
                    {/* Admin Profile */}
                    <li className="mb-16">
                      <a
                        href="#"
                        className="d-flex align-items-center gap-16 text-15 text-dark hover-text-main-600 hover-bg-main-50 rounded-12 py-8 px-16"
                      >
                        <span className="icon icon-gray-400">
                          <i className="ph ph-user-circle"></i>
                        </span>
                        Profile
                      </a>
                    </li>

                    {/* Settings */}
                    <li className="mb-16">
                      <a
                        href="#"
                        className="d-flex align-items-center gap-16 text-15 text-dark hover-text-main-600 hover-bg-main-50 rounded-12 py-8 px-16"
                      >
                        <span className="icon icon-gray-400">
                          <i className="ph ph-gear"></i>
                        </span>
                        Settings
                      </a>
                    </li>

                    {/* Logout */}
                    <li className="mb-16">
                      <button
                        onClick={handleLogout}
                        className="d-flex align-items-center gap-16 text-15 text-dark hover-text-main-600 hover-bg-main-50 rounded-12 py-8 px-16 w-100 bg-transparent border-0"
                      >
                        <span className="icon icon-gray-400">
                          <i className="ph ph-sign-out"></i>
                        </span>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Admin Profile Dropdown End */}
      </div>
    </div>
  );
};

export default Navbar;