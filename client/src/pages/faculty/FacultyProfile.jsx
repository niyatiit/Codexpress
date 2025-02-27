import React, { useState, useEffect } from "react";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";

const FacultyProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id; // Get user ID from local storage

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    profile_picture: "",
    gender: "",
    dob: "",
    pincode: "",
    state: "",
    city: "",
    nationality: "",
  });

  const [stateData, setStateData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
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
          setProfile({
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
            state: userData.state || "",
            city: userData.city || "",
            nationality: userData.nationality || "Indian",
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

  useEffect(() => {
    const fetchStateData = async () => {
      if (!profile.state) return;
      try {
        const response = await axios.get(`http://localhost:3000/states/${profile.state}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.data.success) {
          setStateData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching state data:", error);
      }
    };

    const fetchCityData = async () => {
      if (!profile.city) return;
      try {
        const response = await axios.get(`http://localhost:3000/cities/${profile.city}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.data.success) {
          setCityData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    fetchStateData();
    fetchCityData();
  }, [profile.state, profile.city]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/profile/update`,
        {
          userId: user._id,
          userData: {
            ...profile,
            dob: profile.dob ? new Date(profile.dob).toISOString() : null, // Convert to ISO format for backend
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        const updatedUser = { ...user, ...profile };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-body p-20">
      <div className="bg-white rounded-lg shadow-sm p-24">
        <div className="header mb-16 flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500">
              <img src={profile.profile_picture} alt="Profile" className="w-full h-full object-cover" />
            </div>

            <h5 className="text-xl font-semibold mb-6 text-blue-700">My Profile</h5>
          </div>
          <div className="flex items-center mb-6">
            <button className="ml-4 text-white bg-blue-500 p-2 rounded-md" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input type="text" name="first_name" value={profile.first_name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" disabled={!isEditing} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input type="text" name="last_name" value={profile.last_name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" disabled={!isEditing} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" name="email" value={profile.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" disabled={!isEditing} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" disabled={!isEditing} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input type="text" name="address" value={profile.address} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" disabled={!isEditing} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select name="gender" value={profile.gender} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" disabled={!isEditing}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input type="date" name="dob" value={profile.dob} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" disabled={!isEditing} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
              <input type="text" name="pincode" value={profile.pincode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" disabled={!isEditing} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <input type="text" name="state" value={stateData?.name || profile.state} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" disabled={!isEditing} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input type="text" name="city" value={cityData?.name || profile.city} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" disabled={!isEditing} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
              <input type="text" name="nationality" value={profile.nationality} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" disabled={!isEditing} />
            </div>
          </div>
          {isEditing && (
            <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default FacultyProfile;