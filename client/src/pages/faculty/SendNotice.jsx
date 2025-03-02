import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendNotice = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = useForm();

  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/courses");
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchBatches = async () => {
      if (selectedCourse) {
        try {
          const response = await axios.get(`http://localhost:3000/batches/course/${selectedCourse}`);
          setBatches(response.data.data);
        } catch (error) {
          console.error("Error fetching batches:", error);
        }
      }
    };

    fetchBatches();
  }, [selectedCourse]);

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setSelectedBatches([]);
  };

  const handleBatchSelection = (batchId) => {
    setSelectedBatches((prev) =>
      prev.includes(batchId) ? prev.filter((id) => id !== batchId) : [...prev, batchId]
    );
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    if (selectedBatches.length === 0) {
      toast.error("Please select at least one batch.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/notices", {
        title: data.title,
        description: data.description,
        course_id: selectedCourse,
        faculty_id: authUser.id,
        batch_ids: selectedBatches,
      });

      if (response.data.success) {
        toast.success("Notice sent successfully!");
        reset();
        setSelectedCourse("");
        setSelectedBatches([]);
      }
    } catch (error) {
      console.error("Error sending notice:", error);
      toast.error("Failed to send notice. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <div className="breadcrumb mb-4">
        <ul className="flex gap-4">
          <li>
            <Link to="/faculty" className="text-gray-800 hover:text-main-600">
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-500">&gt;</span>
          </li>
          <li>
            <span className="text-main-600">Send Notice</span>
          </li>
        </ul>
      </div>
      <div className="card bg-white p-24 rounded-lg shadow-md">
        <h5 className="text-lg font-semibold mb-4">Create Notice</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Course</label>
            <select className="form-control" value={selectedCourse} onChange={handleCourseChange} required>
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mt-3">
            <label>Select Batches</label>
            {batches.length > 0 ? (
              <div>
                {batches.map((batch) => (
                  <div key={batch._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={batch._id}
                      checked={selectedBatches.includes(batch._id)}
                      onChange={() => handleBatchSelection(batch._id)}
                    />
                    <label htmlFor={batch._id}>{batch.name}</label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No batches available for this course.</p>
            )}
          </div>
          <div className="form-group mt-3">
            <label>Notice Title</label>
            <input type="text" className="form-control" {...register("title", { required: "Title is required" })} required />
          </div>
          <div className="form-group mt-3">
            <label>Description</label>
            <textarea className="form-control" rows="4" {...register("description", { required: "Description is required" })} required></textarea>
          </div>
          <div className="mt-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Notice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendNotice;
