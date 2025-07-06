import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditFaculty = () => {
    const { id } = useParams(); // Get faculty ID from URL
    const navigate = useNavigate();
    const [faculty, setFaculty] = useState({
        user_id: { first_name: "", last_name: "", email: "" },
        department: "",
        designation: "",
        doj: "",
        experience: "",
        status: "",
    });

    // Fetch faculty details on component mount
    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/faculty/${id}`);
                setFaculty(response.data.data);
            } catch (error) {
                console.error("Error fetching faculty:", error);
            }
        };
        fetchFaculty();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFaculty((prevFaculty) => ({
            ...prevFaculty,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/faculty/update/${id}`, faculty);
            if (response.data.success) {
                alert("Faculty updated successfully!");
                navigate("/admin/manage/faculty"); // Redirect to manage faculty page
            }
        } catch (error) {
            console.error("Error updating faculty:", error);
            alert("Failed to update faculty. Please try again.");
        }
    };

    return (
        <div className="dashboard-body p-24">
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
                            <span className="text-main-600 fw-normal text-15">Edit Faculty</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Edit Faculty Form */}
            <div className="bg-white rounded-lg p-24 shadow-sm">
                <h5 className="text-xl font-semibold mb-4 text-gray-800">Edit Faculty</h5>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={`${faculty.user_id.first_name} ${faculty.user_id.last_name}`}
                                disabled
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={faculty.user_id.email}
                                disabled
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Department */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Department</label>
                            <input
                                type="text"
                                name="department"
                                value={faculty.department}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Designation */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Designation</label>
                            <input
                                type="text"
                                name="designation"
                                value={faculty.designation}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Joining Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Joining Date</label>
                            <input
                                type="date"
                                name="doj"
                                value={faculty.doj.split("T")[0]} // Format date for input
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Experience */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Experience (Years)</label>
                            <input
                                type="number"
                                name="experience"
                                value={faculty.experience}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                name="status"
                                value={faculty.status}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Update Faculty
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditFaculty;