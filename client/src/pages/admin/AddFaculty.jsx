import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AddFaculty = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [facultyDetails, setFacultyDetails] = useState({
    department: "",
    experience: "",
    designation: "",
    doj: "",
    qualifications: [{ degree: "", institution: "", year: "" }],
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/faculty")
      .then((response) => {
        if (response.data.success) {
          setUsers(response.data.users);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleChange = (e, index = null, field = null) => {
    if (index !== null) {
      // Update specific qualification field
      const updatedQualifications = [...facultyDetails.qualifications];
      updatedQualifications[index][field] = e.target.value;
      setFacultyDetails({ ...facultyDetails, qualifications: updatedQualifications });
    } else {
      // Update other fields
      setFacultyDetails({ ...facultyDetails, [e.target.name]: e.target.value });
    }
  };

  const addQualification = () => {
    if (facultyDetails.qualifications.length < 3) {
      setFacultyDetails({
        ...facultyDetails,
        qualifications: [...facultyDetails.qualifications, { degree: "", institution: "", year: "" }],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUser) {
      alert("Please select a faculty member.");
      return;
    }

    const facultyData = {
      user_id: selectedUser,
      ...facultyDetails,
    };

    axios
      .post(`http://localhost:3000/faculty/create`, facultyData)
      .then(() => {
        alert("Faculty added successfully!");
        setSelectedUser("");
        setFacultyDetails({
          department: "",
          experience: "",
          designation: "",
          doj: "",
          qualifications: [{ degree: "", institution: "", year: "" }],
        });
      })
      .catch((error) => {
        console.error("Error adding faculty:", error);
      });
  };

  return (
    <div className="dashboard-body">
      {/* Breadcrumb Section */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/admin" className="text-gray-200 fw-normal text-15 hover-text-main-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Add Faculty</span>
            </li>
          </ul>
        </div>
        <div>
          <Link to="/admin/manage/faculty" className="btn btn-outline-main rounded-pill py-9">
            Manage Faculty
          </Link>
        </div>
      </div>

      {/* Add Faculty Form */}
      <div className="card">
        <div className="card-header border-bottom border-gray-100">
          <h5 className="mb-0">Add New Faculty</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Select Faculty */}
            <div className="mb-16">
              <label htmlFor="user" className="form-label">
                Select Faculty <span className="text-danger">*</span>
              </label>
              <select
                id="user"
                name="user"
                value={selectedUser}
                onChange={handleUserChange}
                className="form-control"
                required
              >
                <option value="">Select Faculty</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div className="mb-16">
              <label htmlFor="department" className="form-label">
                Department <span className="text-danger">*</span>
              </label>
              <select
                id="department"
                name="department"
                value={facultyDetails.department}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
            </div>

            {/* Experience */}
            <div className="mb-16">
              <label htmlFor="experience" className="form-label">
                Experience (in years) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={facultyDetails.experience}
                onChange={handleChange}
                className="form-control"
                min="0"
                required
              />
            </div>

            {/* Designation */}
            <div className="mb-16">
              <label htmlFor="designation" className="form-label">
                Designation <span className="text-danger">*</span>
              </label>
              <select
                id="designation"
                name="designation"
                value={facultyDetails.designation}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select Designation</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Professor">Professor</option>
              </select>
            </div>

            {/* Date of Joining */}
            <div className="mb-16">
              <label htmlFor="doj" className="form-label">
                Date of Joining <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                id="doj"
                name="doj"
                value={facultyDetails.doj}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Qualifications (Up to 3) */}
            {facultyDetails.qualifications.map((qual, index) => (
              <div className="mb-16" key={index}>
                <label className="form-label">Qualification {index + 1}</label>
                <div className="d-flex gap-8">
                  <input
                    type="text"
                    placeholder="Degree"
                    value={qual.degree}
                    onChange={(e) => handleChange(e, index, "degree")}
                    className="form-control"
                  />
                  <input
                    type="text"
                    placeholder="Institution"
                    value={qual.institution}
                    onChange={(e) => handleChange(e, index, "institution")}
                    className="form-control"
                  />
                  <input
                    type="number"
                    placeholder="Year"
                    value={qual.year}
                    onChange={(e) => handleChange(e, index, "year")}
                    className="form-control"
                  />
                </div>
              </div>
            ))}

            {facultyDetails.qualifications.length < 3 && (
              <button type="button" onClick={addQualification} className="btn bg-blue-500 text-white">
                + Add Qualification
              </button>
            )}

            {/* Submit & Cancel Buttons */}
            <div className="flex justify-end gap-3">
              <button type="submit" className="btn btn-main rounded-pill py-9">
                Add Faculty
              </button>
              <Link to="/admin/manage/faculty" className="border-2 border-blue-500 text-blue-500 px-20 rounded-pill py-9">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFaculty;
