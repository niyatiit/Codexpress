import React, { useState, useEffect } from "react";
import { Link, redirectDocument, useNavigate ,useSearchParams} from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id; 
  
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/courses"; // Default redirect
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

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch user data on component mount
  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const userData = response.data.user;
          console.log(userData)
          setFormData({
            username: userData.username,
            email: userData.email,
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            phone: userData.phone || "",
            address: userData.address || "",
            profile_picture: userData.profile_picture || "/assets/img/default-profile.png",
            gender: userData.gender || "",
            dob: userData.dob ? new Date(userData.dob).toISOString().split("T")[0] : "", // Convert to yyyy-MM-dd
            pincode: userData.pincode || "",
           
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

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

  // Handle file upload for profile picture


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Validate required fields
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
  
      const newErrors = {};
      requiredFields.forEach((field) => {
        if (!formData[field]) {
          newErrors[field] = `${field.replace("_", " ")} is required`;
        }
      });
  
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }
  
      // Send PUT request to update user profile
      const response = await axios.put(
        `http://localhost:3000/profile/update`,
        { ...formData, userId }, // Ensure userId is correctly accessed
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.data.success) {
        alert("Profile updated successfully!");
        navigate(redirect); // Use the `redirect` variable
      }else {
        console.log("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error.response ? error.response.data : error);
      console.log("An error occurred. Please try again.");
    } finally {
      setLoading(false);
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
                    value={formData.dob}
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
                  />
                </div>


                <div className="col-sm-6">
                  <label className="h5 mb-8 fw-semibold font-heading">Pincode</label>
                  <input
                    type="text"
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
                  <button type="submit" className="btn btn-main rounded-pill py-9" disabled={loading}>
  {loading ? "Updating..." : "Update Profile"}
</button>
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