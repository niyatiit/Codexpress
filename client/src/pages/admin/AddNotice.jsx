import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNotice = () => {
  // State management
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    recipientType: "faculty" // 'faculty' or 'all'
  });
  const [loading, setLoading] = useState({
    submitting: false
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading({ submitting: true });

    // Basic validation
    if (!formData.title || !formData.description) {
      toast.error("Title and description are required");
      setLoading({ submitting: false });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/notifications", {
        title: formData.title,
        description: formData.description,
        recipientType: formData.recipientType
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("response is ",response)
      if (response.data.success) {
        toast.success("Notification created successfully!");
        // Reset form
        setFormData({
          title: "",
          description: "",
          recipientType: "faculty"
        });
      }
    } catch (error) {
      console.error("Error creating notification:", error);
      toast.error(error.response?.data?.message || "Failed to create notification");
    } finally {
      setLoading({ submitting: false });
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      recipientType: "faculty"
    });
  };

  return (
    <div className="dashboard-body">
      <ToastContainer position="top-right" autoClose={5000} />
      
      {/* Breadcrumb navigation - EXACTLY THE SAME */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <a href="/admin" className="text-gray-200 fw-normal text-15 hover-text-main-600">
                Home
              </a>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Add Notice</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Main card container - EXACTLY THE SAME STRUCTURE */}
      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between">
          <h5 className="mb-0">Create and Send Notification</h5>
        </div>
        
        <div className="card-body">
          <form className="form" onSubmit={handleSubmit} onReset={handleReset}>
            {/* Notice Title - EXACTLY THE SAME */}
            <div className="mb-16">
              <label htmlFor="title" className="form-label fw-medium">
                Notice Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter the notice title"
                required
              />
            </div>

            {/* Notice Description - EXACTLY THE SAME */}
            <div className="mb-16">
              <label htmlFor="description" className="form-label fw-medium">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-control"
                rows="4"
                placeholder="Enter detailed description for the notice"
                required
              ></textarea>
            </div>

            {/* Recipient Type - SIMPLIFIED TO TWO OPTIONS */}
            <div className="mb-16">
              <label htmlFor="recipientType" className="form-label fw-medium">
                Send To <span className="text-red-500">*</span>
              </label>
              <select
                id="recipientType"
                name="recipientType"
                value={formData.recipientType}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="faculty">Faculty Only</option>
                <option value="all">All Users (Faculty + Students)</option>
              </select>
            </div>

            {/* Form buttons - EXACTLY THE SAME */}
            <div className="flex gap-16">
              <button 
                type="reset" 
                className="btn border-2 text-gray-300 border-gray-300 rounded-pill hover:bg-gray-200"
              >
                Clear
              </button>
              <button 
                type="submit" 
                className="btn btn-main rounded-pill"
                disabled={loading.submitting}
              >
                {loading.submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Sending...
                  </>
                ) : "Send Notification"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNotice;