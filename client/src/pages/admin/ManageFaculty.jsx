import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ManageFaculty = () => {
  const [faculties, setFaculties] = useState([]); // All faculties fetched from the API
  const [filteredFaculties, setFilteredFaculties] = useState([]); // Faculties filtered by search
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Fetch faculty data from backend
  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get("http://localhost:3000/faculty");
      setFaculties(response.data.faculties);
      setFilteredFaculties(response.data.faculties); // Initialize filtered faculties with all faculties
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter faculties based on the search query
    const filtered = faculties.filter((faculty) => {
      const fullName = `${faculty.user_id.first_name} ${faculty.user_id.last_name}`.toLowerCase();
      const email = faculty.user_id.email.toLowerCase();
      const department = faculty.department.toLowerCase();

      return (
        fullName.includes(query) ||
        email.includes(query) ||
        department.includes(query)
      );
    });

    setFilteredFaculties(filtered); // Update filtered faculties
  };

  return (
    <div className="dashboard-body p-12">
      {/* Breadcrumb Section */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-20">
          <ul className="flex-align gap-4">
            <li>
              <Link
                to="/admin"
                className="text-gray-200 fw-normal text-15 hover-text-main-600"
              >
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">
                Manage Faculty
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Search by name, email, or department"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Faculty Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">Faculty List</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-blue-100 rounded-md text-blue-700">
              <tr>
                <th className="p-2 py-4 text-left">#</th>
                <th className="p-2 py-4 text-left">Name</th>
                <th className="p-2 py-4 text-left">Email</th>
                <th className="p-2 py-4 text-left">Department</th>
                <th className="p-2 py-4 text-left">Designation</th>
                <th className="p-2 py-4 text-left">Joining Date</th>
                <th className="p-2 py-4 text-left">Experience</th>
                <th className="p-2 py-4 text-left">Status</th>
                <th className="p-2 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculties.length > 0 ? (
                filteredFaculties.map((faculty, index) => (
                  <tr key={faculty._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">
                      {faculty.user_id.first_name} {faculty.user_id.last_name}
                    </td>
                    <td className="p-3">{faculty.user_id.email}</td>
                    <td className="p-3">{faculty.department}</td>
                    <td className="p-3">{faculty.designation}</td>
                    <td className="p-3">
                      {new Date(faculty.doj).toLocaleDateString()}
                    </td>
                    <td className="p-3">{faculty.experience} years</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] ${
                          faculty.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {faculty.status}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <Link
                        to={`/admin/edit-faculty/${faculty._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center p-4 text-gray-500">
                    No faculty members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 mx-2">
          Previous
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 mx-2">
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageFaculty;