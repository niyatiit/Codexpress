import { Link } from "react-router-dom";
import { useState } from "react";
import logo from '../../../assets/logo.png'

const StudentHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/student">
          <img src={logo} alt="CodeExpress Logo" className="h-10" />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/student" className="text-gray-700 hover:text-main-600">
            <i className="ph ph-squares-four"></i> Dashboard
          </Link>
          
          <div
            className="relative group"
            onMouseEnter={() => setDropdownOpen("courses")}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <button className="text-gray-700 hover:text-main-600 flex items-center">
              <i className="ph ph-graduation-cap"></i> My Courses ▾
            </button>
            <div
              className={`absolute left-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 ${
                dropdownOpen === "courses" ? "block" : "hidden"
              }`}
            >
              <Link to="/student/enrolled/courses" className="block px-4 py-2 hover:bg-gray-100">
                Enrolled Courses
              </Link>
              <Link to="/student/available/courses" className="block px-4 py-2 hover:bg-gray-100">
                Available Courses
              </Link>
            </div>
          </div>

          <Link to="/student/my/batches" className="text-gray-700 hover:text-main-600">
            <i className="ph ph-users"></i> My Batches
          </Link>

          <Link to="/student/view/attendance" className="text-gray-700 hover:text-main-600">
            <i className="ph ph-pen"></i> Attendance
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="ph ph-list"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-full left-0 w-full py-4">
          <Link to="/student" className="block px-6 py-2">Dashboard</Link>
          <Link to="/student/enrolled/courses" className="block px-6 py-2">My Courses</Link>
          <Link to="/student/my/batches" className="block px-6 py-2">My Batches</Link>
          <Link to="/student/view/attendance" className="block px-6 py-2">Attendance</Link>
        </div>
      )}
    </header>
  );
};

export default StudentHeader;