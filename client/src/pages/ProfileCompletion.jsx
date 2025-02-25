import React from "react";
import { useState } from "react";

const ProfileCompletion = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    profile_picture: "",
    gender: "",
    dob: "",
    address: "",
    pincode: "",
    state: "",
    city: "",
    nationality: "Indian",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data Submitted", formData);
    // Add API call here
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="username" value={formData.username} onChange={handleChange} placeholder="Full Name" className="p-2 border rounded" required />
        <input name="email" value={formData.email} disabled className="p-2 border rounded bg-gray-200" />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="p-2 border rounded" required />
        <input name="dob" type="date" value={formData.dob} onChange={handleChange} className="p-2 border rounded" required />
        <select name="gender" value={formData.gender} onChange={handleChange} className="p-2 border rounded">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="p-2 border rounded" required />
        <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="p-2 border rounded" required />
        <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="p-2 border rounded" required />
        <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="p-2 border rounded" required />
        <input name="nationality" value={formData.nationality} disabled className="p-2 border rounded bg-gray-200" />
        <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default ProfileCompletion;
