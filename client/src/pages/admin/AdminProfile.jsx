import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminProfile = () => {
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
    nationality: "Indian",
  });

  const [stateData, setStateData] = useState(null);
  const [cityData, setCityData] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch Admin Profile
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/profile/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        console.log("Full API Response:", response.data); // Check entire response
        if (response.data.success) {
          const userData = response.data.user;
          console.log("Fetched User Data:", userData);
          console.log("Profile Picture URL:", userData.profile_picture); // Debug profile picture

          setProfile({
            ...userData,
            profile_picture: userData.profile_picture && userData.profile_picture.trim() !== ""
              ? userData.profile_picture
              : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
          });
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        alert("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId,user]);

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
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };
  useEffect(() => {
    console.log("Profile Picture URL:", profile?.profile_picture);
  }, [profile.profile_picture]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/admin/profile/update`,
        {
          userId: user._id,
          userData: { ...profile, dob: profile.dob ? new Date(profile.dob).toISOString() : null },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
      alert("Failed to update profile.");
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
              <img src={
                profile.profile_picture ||
                "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
              } alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h5 className="text-xl font-semibold mb-6 text-blue-700">Admin Profile</h5>
          </div>
          <button className="ml-4 text-white bg-blue-500 p-2 rounded-md" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </button>
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
              <input type="text" name="state" value={profile.state} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" disabled={!isEditing} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input type="text" name="city" value={profile.city} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" disabled={!isEditing} />
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

export default AdminProfile;
