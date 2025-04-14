import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignmentDetail = () => {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const fetchAssignmentData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch assignment details
        const assignmentRes = await axios.get(
          `http://localhost:3000/assignments/${assignmentId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setAssignment(assignmentRes.data.data);

        // Fetch user's submission for this assignment
        const submissionRes = await axios.get(
          `http://localhost:3000/assignments/submissions/${assignmentId}/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (submissionRes.data.data) {
          setSubmission(submissionRes.data.data);
        }

      } catch (error) {
        console.error("Error fetching assignment data:", error);
        toast.error("Failed to load assignment details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignmentData();
  }, [assignmentId, userId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.warning("Please select a file to submit");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `http://localhost:3000/assignments/submit/${assignmentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSubmission(response.data.data);
      toast.success("Assignment submitted successfully!");
    } catch (error) {
      console.error("Error submitting assignment:", error);
      toast.error("Failed to submit assignment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const isAssignmentDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    return today > due;
  };

  if (isLoading) {
    return (
      <div className="dashboard-body">
        <div className="text-center py-8">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600">Loading assignment details...</p>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="dashboard-body">
        <div className="text-center py-8">
          <i className="ph ph-file-x text-5xl text-gray-400 mb-4"></i>
          <h4 className="text-lg font-medium text-gray-600">Assignment Not Found</h4>
          <p className="text-gray-500 mt-2">
            The requested assignment could not be found
          </p>
          <Link
            to="/student/assignments"
            className="btn bg-blue-400 mt-3 hover:bg-blue-500"
          >
            Back to Assignments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-body">
      {/* Breadcrumb Section */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link
                to="/student"
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
              <Link
                to="/student/assignments"
                className="text-gray-200 fw-normal text-15 hover-text-main-600"
              >
                Assignments
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">{assignment.title}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between">
          <h5 className="mb-0">{assignment.title}</h5>
          <span className={`badge ${
            isAssignmentDue(assignment.due_date) ? 'bg-red-500' : 'bg-primary'
          }`}>
            {isAssignmentDue(assignment.due_date) ? 'Overdue' : 'Active'}
          </span>
        </div>
        
        <div className="card-body">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="mb-6">
                <h6 className="text-gray-600 mb-2">Description</h6>
                <p className="text-gray-800">
                  {assignment.description || "No description provided"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h6 className="text-gray-600 mb-2">Posted Date</h6>
                  <p className="text-gray-800">
                    {formatDate(assignment.created_at)}
                  </p>
                </div>
                <div>
                  <h6 className="text-gray-600 mb-2">Due Date</h6>
                  <p className={`${
                    isAssignmentDue(assignment.due_date) ? 'text-red-500' : 'text-gray-800'
                  }`}>
                    {formatDate(assignment.due_date)}
                    {isAssignmentDue(assignment.due_date) && " (Past Due)"}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h6 className="text-gray-600 mb-2">Assignment File</h6>
                <a
                  href={`http://localhost:3000${assignment.file_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-blue-500 hover:bg-blue-600 text-white inline-flex items-center"
                  download
                >
                  <i className="ph ph-download mr-2"></i> Download Assignment
                </a>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="border rounded-lg p-4 bg-gray-50">
                <h6 className="text-gray-600 mb-4">Your Submission</h6>
                
                {submission ? (
                  <>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Submitted on:</p>
                      <p className="text-gray-800">
                        {formatDate(submission.submitted_at)}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Status:</p>
                      <p className="text-gray-800 capitalize">
                        {submission.status || "submitted"}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Your File:</p>
                      <a
                        href={`http://localhost:3000${submission.file_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 inline-flex items-center"
                        download
                      >
                        <i className="ph ph-download mr-2"></i> Download Submission
                      </a>
                    </div>
                    {!isAssignmentDue(assignment.due_date) && (
                      <p className="text-sm text-gray-500 mt-4">
                        You can resubmit before the due date
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500 mb-4">
                    {isAssignmentDue(assignment.due_date) 
                      ? "You haven't submitted this assignment (Past Due)"
                      : "You haven't submitted this assignment yet"}
                  </p>
                )}

                {!isAssignmentDue(assignment.due_date) && (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {submission ? "Resubmit File" : "Submit File"}
                      </label>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn bg-green-500 hover:bg-green-600 text-white w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <i className="ph ph-upload mr-2"></i>
                          {submission ? "Resubmit" : "Submit Assignment"}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetail;