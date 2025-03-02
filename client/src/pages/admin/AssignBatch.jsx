import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import BatchAssignmentForm from "../../pages/admin/BatchAssignmentForm";

const AssignBatch = () => {
  const { userId } = useParams(); // Fetch userId from params
  const navigate = useNavigate();
  const location = useLocation();

  const [enrollments, setEnrollments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extract course_id from query parameters
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("course_id");

  useEffect(() => {
    if (userId) {
      fetchUserEnrollments();
    }
  }, [userId]);

  useEffect(() => {
    if (courseId && enrollments.length > 0) {
      // Find the enrollment related to the course
      const matchedEnrollment = enrollments.find((enrollment) =>
        enrollment.courses.some((course) => course.course_id === courseId)
      );

      if (matchedEnrollment) {
        setSelectedEnrollment(matchedEnrollment);
        fetchBatchesByCourse(courseId); // Pass the courseId correctly
      } else {
        setError("No enrollment found for this course.");
      }
    }
  }, [courseId, enrollments]);

  // Fetch enrollments for the given userId
  const fetchUserEnrollments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/enrollments/user/${userId}`);
      console.log("User Enrollments Response:", response.data);
      setEnrollments(response.data.enrollments); // Access the `enrollments` array
    } catch (error) {
      console.error("Error fetching user enrollments:", error);
      setError("Failed to fetch user enrollments.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch batches based on course_id (using URL parameter)
  const fetchBatchesByCourse = async (courseId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/batches/course/${courseId}`);
      console.log("Batches Response:", response.data);
      if (response.data.success) {
        setBatches(response.data.data); // Access the `data` array
      } else {
        setError(response.data.message || "Failed to fetch batches for the course.");
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
      setError("Failed to fetch batches for the course.");
    } finally {
      setLoading(false);
    }
  };

  // Handle batch assignment
  const handleAssignBatch = async (batchId) => {
    if (!selectedEnrollment) {
      alert("No valid enrollment found to assign the batch.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/batches/assign-student", {
        enrollment_id: selectedEnrollment._id,
        batch_id: batchId,
        course_id: courseId
      });
      alert("Batch assigned successfully!");
      navigate("/admin/manage/enrollments");
    } catch (error) {
      console.error("Error assigning batch:", error);
      setError("Failed to assign batch.");
    }
  };

  return (
    <div className="dashboard-body p-24">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-20">
          <ul className="flex-align gap-4">
            <li>
              <Link
                to="/admin"
                className="text-gray-200 fw-normal text-15 hover-text-main-600"
              >
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Assign Batch</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Error Message Display */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Loading Indicator */}
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <>
          {/* Display the Batch Assignment Form only if enrollment & batches exist */}
          {selectedEnrollment && batches.length > 0 ? (
            <BatchAssignmentForm
              enrollment={selectedEnrollment}
              batches={batches}
              onAssignBatch={handleAssignBatch}
            />
          ) : (
            <p className="text-gray-600">
              {enrollments.length === 0
                ? "No enrollments found for this user."
                : "No batches available for this course."}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AssignBatch;