import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate,Link } from "react-router-dom";

const EditBatch = () => {
  const { id } = useParams(); // Get batch ID from URL
  const navigate = useNavigate();
  const [batch, setBatch] = useState({
    name: "",
    start_date: "",
    end_date: "",
    batch_type: "",
    batch_description: "",
    total_seats: "",
  });

  // Fetch batch details on component mount
  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/batches/${id}`);
        setBatch(response.data.data);
      } catch (error) {
        console.error("Error fetching batch:", error);
      }
    };
    fetchBatch();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatch({ ...batch, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/batches/update/${id}`, batch);
      if (response.data.success) {
        alert("Batch updated successfully!");
        navigate("/admin/manage/batches"); // Redirect to manage batches page
      }
    } catch (error) {
      console.error("Error updating batch:", error);
      alert("Failed to update batch. Please try again.");
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
                    <span className="text-main-600 fw-normal text-15">
                      Edit Batch
                    </span>
                  </li>
                </ul>
              </div>
            </div>

      {/* Edit Batch Form */}
      <div className="bg-white rounded-lg p-24 shadow-sm">
        <h5 className="text-xl font-semibold mb-4 text-gray-800">Edit Batch</h5>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Batch Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Batch Name</label>
              <input
                type="text"
                name="name"
                value={batch.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={batch.start_date.split("T")[0]} // Format date for input
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                name="end_date"
                value={batch.end_date.split("T")[0]} // Format date for input
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Batch Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Batch Type</label>
              <select
                name="batch_type"
                value={batch.batch_type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Weekday">Weekday</option>
                <option value="Weekend">Weekend</option>
                <option value="Crash Course">Crash Course</option>
              </select>
            </div>

            {/* Total Seats */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Seats</label>
              <input
                type="number"
                name="total_seats"
                value={batch.total_seats}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Batch Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="batch_description"
                value={batch.batch_description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Batch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBatch;