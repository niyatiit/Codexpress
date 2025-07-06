import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/courses"; // Default redirect
  // const { user, loading } = useUser();
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(false); // State to store user data
  const authUser = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    const fetchuserdata = async () => {
      const response = await axios.get(`http://localhost:3000/profile/${authUser.id}`)
      if (response.data.success) {
        setLoading(false)
        console.log(response.data.user)

        setUser(response.data.user)
      }

    }
    fetchuserdata()
  }, []);
  // State to manage form inputs
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    profile_picture: "",
    gender: "",
    dob: "",
    address: "",
    pincode: "",
  });

  useEffect(() => {
    if (user) {
      // Format the date of birth (dob) to YYYY-MM-DD
      const formattedDob = user.dob ? new Date(user.dob).toISOString().split("T")[0] : "";

      setFormData((prev) => ({
        ...prev,
        username: user.username || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        profile_picture: user.profile_picture || "",
        gender: user.gender || "",
        dob: formattedDob, // Use the formatted date
        address: user.address || "",
        pincode: user.pincode || "",
      }));
    }
  }, [user]);

  const [errors, setErrors] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>No user data found.</p>;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    const requiredFields = [
      "username",
      "first_name",
      "last_name",
      "email",
      "phone",
      "gender",
      "dob",
      "address",
      "pincode",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace("_", " ")} is required`;
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // Date of Birth validation (must be at least 14 years old)
    if (formData.dob) {
      const dobDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      if (age < 14 || (age === 14 && today < new Date(today.setFullYear(dobDate.getFullYear() + 14)))) {
        newErrors.dob = "You must be at least 14 years old";
      }
    }

    // Pincode validation (6 digits)
    const pincodeRegex = /^\d{6}$/;
    if (formData.pincode && !pincodeRegex.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    if (!validateForm()) {
      setLoadingSubmit(false);
      return;
    }

    try {
      // Send PUT request to update user profile
      const response = await axios.put(
        `http://localhost:3000/profile/update`,
        { ...formData, userId: user._id }, // Use `user._id` instead of `user.id`
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("Profile updated successfully!");
        navigate(redirect); // Use the `redirect` variable
      } else {
        console.log("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error.response ? error.response.data : error);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoadingSubmit(false); // Fix: Use `setLoadingSubmit` instead of `setLoading`
    }
  };

  return (
    <div>
      <Header />
      <div className="dashboard-body mt-48 p-48">
        <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
          <div className="breadcrumb mb-24">
            <ul className="flex-align gap-4">
              <li>
                <Link to="/" className="text-gray-200 fw-normal text-15 hover-text-main-600">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-500 fw-normal d-flex">
                  <i className="ph ph-caret-right"></i>
                </span>
              </li>
              <li>
                <span className="text-main-600 fw-normal text-15">Complete Profile</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header border-bottom border-gray-100 flex-align gap-8">
            <h5 className="mb-0">Profile Details</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row gy-20">
                {/* Personal Details */}
                <div className="col-sm-6">
                  <label className="h5 mb-8 fw-semibold font-heading">Username</label>
                  <input
                    type="text"
                    className="form-control py-11"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && <p className="text-danger">{errors.username}</p>}
                </div>
                <div className="col-sm-6">
                  <label className="h5 mb-8 fw-semibold font-heading">First Name</label>
                  <input
                    type="text"
                    className="form-control py-11"
                    placeholder="Enter first name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                  {errors.first_name && <p className="text-danger">{errors.first_name}</p>}
                </div>
                <div className="col-sm-6">
                  <label className="h5 mb-8 fw-semibold font-heading">Last Name</label>
                  <input
                    type="text"
                    className="form-control py-11"
                    placeholder="Enter last name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                  {errors.last_name && <p className="text-danger">{errors.last_name}</p>}
                </div>

                <div className="col-sm-6">
                  <label className="h5 mb-8 fw-semibold font-heading">Email Address</label>
                  <input
                    type="email"
                    className="form-control py-11"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-danger">{errors.email}</p>}
                </div>
                <div className="col-sm-6">
                  <label className="h5 mb-8 fw-semibold font-heading">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control py-11"
                    placeholder="Enter phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <p className="text-danger">{errors.phone}</p>}
                </div>

                <div className="col-sm-6">
                  <label className="h5 mb-8 fw-semibold font-heading">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control py-11"
                    name="dob"
                    value={formData.dob || ""} // Ensure the value is set correctly
                    onChange={handleChange}
                  />
                  {errors.dob && <p className="text-danger">{errors.dob}</p>}
                </div>
                <div className="col-sm-6">
                  <label className="h5 mb-8 fw-semibold font-heading">Gender</label>
                  <select
                    className="form-select py-9"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option disabled value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="text-danger">{errors.gender}</p>}
                </div>

                {/* Address and Profile Image */}
                <div className="col-sm-12">
                  <label className="h5 mb-8 fw-semibold font-heading">Address</label>
                  <textarea
                    className="form-control py-11"
                    placeholder="Enter address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                  {errors.address && <p className="text-danger">{errors.address}</p>}
                </div>
                <div className="col-sm-12">
                  <label className="h5 mb-8 fw-semibold font-heading">Profile Image URL</label>
                  <input
                    type="text"
                    className="form-control py-11"
                    name="profile_picture"
                    placeholder="Enter profile image URL"
                    value={formData.profile_picture || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-sm-6">
                  <label className="h5 mb-8 fw-semibold font-heading">Pincode</label>
                  <input
                    type="text"
                    required
                    className="form-control py-11"
                    placeholder="Enter pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                  {errors.pincode && <p className="text-danger">{errors.pincode}</p>}
                </div>

                <div className="flex-align justify-content-end gap-8">
                  <Link to={redirect} className="btn btn-outline-main rounded-pill py-9">Cancel</Link>
                  <button type="submit" className="btn btn-main rounded-pill py-9" disabled={loadingSubmit}>{loadingSubmit ? "Updating..." : "Update Profile"}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;