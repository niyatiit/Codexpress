import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageNotifications = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipientType, setRecipientType] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/notifications", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data.data || []);
      setNotices(response.data.data || []);
    } catch (error) {
      console.error("Error fetching notices:", error);
      toast.error("Failed to load notices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete this notice?");
    if (!confirm) return;
    try {
      await axios.delete(`http://localhost:3000/notifications/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Notice deleted");
      fetchNotices();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete notice");
    }
  };

  return (
    <div className="dashboard-body">
      <ToastContainer />
      <h2 className="mb-4 text-xl font-semibold">Manage Notifications</h2>

      {/* Add Notice */}
      {/* <div className="card p-4 mb-6">
        <h5 className="mb-4">Add New Notice</h5>
        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="form-select mb-3"
            value={recipientType}
            onChange={(e) => setRecipientType(e.target.value)}
          >
            <option value="all">General (All)</option>
            <option value="faculty">Faculty Only</option>
          </select>
          <button className="btn btn-main rounded-pill" onClick={handleAddNotice}>
            Add Notice
          </button>
        </div>
      </div> */}

      {/* Notices List */}
      <div className="card p-4">
        <h5 className="mb-4">All Notices ({notices.length})</h5>
        {loading ? (
          <p>Loading...</p>
        ) : notices.length > 0 ? (
          <div className="grid gap-4">
            {notices.map((notice) => (
              <div key={notice._id} className="p-3 border rounded shadow-sm bg-gray-50">
                <div className="flex justify-between items-center">
                  <h6 className="font-semibold text-blue-700">{notice.title}</h6>
                  <span className={`badge ${notice.recipientType === "faculty" ? "bg-purple-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                    {notice.recipientType == "faculty" ? "Faculty" : "General"}
                  </span>
                </div>
                <p className="text-gray-700 my-2">{notice.description}</p>
                <div className="text-sm text-gray-500 mb-2">{new Date(notice.createdAt).toLocaleString()}</div>
                <button className="btn btn-danger btn-sm rounded-pill" onClick={() => handleDelete(notice._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No notices available</p>
        )}
      </div>
    </div>
  );
};

export default ManageNotifications;
