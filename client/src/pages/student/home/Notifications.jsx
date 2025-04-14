import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notifications = () => {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/notifications", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const studentNotices = (response.data.data || []).filter(
          (notice) => notice.recipientType === "allss"
        );
        setNotices(studentNotices);
      } catch (error) {
        console.error("Error fetching notices:", error);
        toast.error("Failed to load notices");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Filter by search
  useEffect(() => {
    let result = notices;
    if (searchTerm) {
      result = result.filter((notice) =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredNotices(result);
  }, [notices, searchTerm]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  return (
    <div className="dashboard-body">
      <ToastContainer />

      {/* Breadcrumb */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/student" className="text-gray-200 fw-normal text-15 hover-text-main-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Student Notices</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Search */}
      <div className="card mb-24">
        <div className="card-header border-bottom border-gray-100 flex-between">
          <h5 className="mb-0">Search Student Notices</h5>
        </div>
        <div className="card-body">
          <div className="mb-16">
            <label htmlFor="search" className="form-label fw-medium">
              Search by title or description
            </label>
            <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Notices List */}
      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between">
          <h5 className="mb-0">
            Student Notices{" "}
            <span className="text-gray-500 text-14 fw-normal ms-8">
              ({filteredNotices.length} found)
            </span>
          </h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-8">
              <div className="spinner-border text-main-600" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredNotices.length > 0 ? (
            <div className="grid gap-16">
              {filteredNotices.map((notice) => {
                const { date, time } = formatDateTime(notice.createdAt);
                return (
                  <div key={notice._id} className="notice-card bg-blue-50 border-blue-200 border-[1px] rounded-md p-16 hover:shadow-sm transition-all">
                    <div>
                      <div className="flex justify-between items-center gap-8">
                        <h4 className="text-lg font-semibold text-blue-900 pb-2 rounded-lg w-full">{notice.title}</h4>
                        <span className="badge bg-blue-100 text-blue-800 rounded-pill">
                          Student
                        </span>
                      </div>
                      <p className="text-gray-600 mb-16">{notice.description}</p>
                    </div>

                    <div className="flex-align gap-16 text-13 text-gray-500">
                      <div className="flex-align gap-1">
                        <i className="ph ph-calendar"></i>
                        <span>{date}</span>
                      </div>
                      <div className="flex-align gap-1">
                        <i className="ph ph-clock"></i>
                        <span>{time}</span>
                      </div>
                      <div className="flex-align gap-1">
                        <i className="ph ph-user"></i>
                        <span>Admin</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="mb-16">
                <i className="ph ph-warning-circle text-48 text-gray-400"></i>
              </div>
              <h5 className="text-16 fw-medium text-gray-700 mb-8">No notices found</h5>
              <p className="text-gray-500 mb-16">Try changing your search keyword</p>
              <button 
                className="btn btn-outline-gray rounded-pill"
                onClick={() => setSearchTerm("")}
              >
                <i className="ph ph-arrow-counter-clockwise me-4"></i>
                Reset search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
