// src/pages/admin/ManageEnrollments.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EnrollmentTable from "../../pages/admin/EnrollmentTable";

const ManageEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetchEnrollments();
  }, [statusFilter, dateFilter]);

  const fetchEnrollments = async () => {
    try {
      const params = {};
      if (statusFilter !== "all") {
        params.status = statusFilter;
      }
      if (dateFilter) {
        params.date = dateFilter;
      }

      const response = await axios.get("http://localhost:3000/enrollments", { params });
      console.log(response.data)
      setEnrollments(response.data.enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
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
              <span className="text-main-600 fw-normal text-15">Manage Enrollments</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex gap-4 mb-36 bg-blue-100 py-20 px-40 rounded-md">
        
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="enrolled">Enrolled</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* Date Filter */}
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Enrollment Table */}  
      <EnrollmentTable enrollments={enrollments} />
    </div>
  );
};

export default ManageEnrollments;