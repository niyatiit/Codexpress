import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "js-circle-progress"; // Import the library
import RecentAssignments from "./RecentAssignments";
const Dashboard = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [student, setStudent] = useState({ username: "user" }); // State to store student data
    const userId = JSON.parse(localStorage.getItem("user")).id; // Get user ID from localStorage

    // Fetch student's data (name, etc.)
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${userId}`);
                console.log("Student Data Response:", response.data); // Log the response
                if (response.data.length > 0) {
                    setStudent(response.data[0]); // Use the first element in the array
                }
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        fetchStudentData();
    }, [userId]);

    // Fetch student's course progress
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/student/progress/${userId}`);
                console.log("Enrollments Re sponse:", response.data.enrollments); // Debugging
                setEnrollments(response.data.enrollments);
            } catch (error) {
                console.error("Error fetching progress:", error);
            }
        };

        fetchProgress();
    }, [userId]);

    // Fetch and filter assignments based on enrollments
    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get("http://localhost:3000/assignments/recent");
                const allAssignments = response.data.assignments;

                // Get all course_id and batch_id from enrollments
                const enrolledCoursesAndBatches = enrollments.flatMap((enrollment) =>
                    enrollment.courses.map((course) => ({
                        course_id: course.course_id._id,
                        batch_id: course.batch_id?._id, // Handle cases where batch_id might be null
                    }))
                );

                // Filter assignments
                const filtered = allAssignments.filter((assignment) => {
                    return enrolledCoursesAndBatches.some(
                        (enrolled) =>
                            enrolled.course_id === assignment.course_id._id &&
                            (enrolled.batch_id === null || enrolled.batch_id === assignment.batch_id?._id)
                    );
                });

                setAssignments(filtered);
            } catch (error) {
                console.error("Error fetching assignments:", error);
            }
        };

        fetchAssignments();
    }, [enrollments]); // Re-run when enrollments change

    return (
        <div className="dashboard-body">
            <div className="col-lg-9">
                {/* Greeting Box */}
                <div className="grettings-box position-relative rounded-16 bg-main-600 overflow-hidden gap-16 flex-wrap z-1 mb-24">
                    <img
                        src="assets/images/bg/grettings-pattern.png"
                        alt=""
                        className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 opacity-6"
                    />
                    <div className="row gy-4">
                        <div className="col-sm-7">
                            <div className="grettings-box__content py-xl-4">
                                <h2 className="text-white mb-0">Hello, {student?.username}!</h2>
                                <p className="text-15 fw-light mt-4 text-white">
                                    Let’s learn something new today.
                                </p>
                                <p className="text-lg fw-light mt-24 text-white">
                                    Set your study plan and grow with the community.
                                </p>
                            </div>
                        </div>
                        <div className="col-sm-5 d-sm-block d-none">
                            <div className="text-center h-100 d-flex justify-content-center align-items-end">
                                <img src="assets/images/thumbs/gretting-img.png" alt="Student" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-4 border-b p-3">
                        <h4 className="text-xl text-gray-800">Course Progress</h4>
                    </div>
                    <div className="p-2">
                        <div className="flex flex-wrap justify-center gap-5">
                            {enrollments.map((enrollment) =>
                                enrollment.courses.map((course) => (
                                    <div key={course.course_id._id} className="flex flex-col gap-4 items-center">
                                        {/* SVG Circle Progress */}
                                        <div className="relative w-[124px] h-[124px]">
                                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                                {/* Background circle */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="46"
                                                    fill="none"
                                                    stroke="#e0e0e0"
                                                    strokeWidth="8"
                                                />
                                                {/* Progress circle */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="46"
                                                    fill="none"
                                                    stroke="#3b82f6"
                                                    strokeWidth="8"
                                                    strokeLinecap="round"
                                                    strokeDasharray={`${2 * Math.PI * 46 * course.progress / 100} ${2 * Math.PI * 46}`}
                                                    transform="rotate(-90 50 50)"
                                                />
                                            </svg>
                                            {/* Percentage text */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-xl font-bold text-gray-800">{course.progress}%</span>
                                            </div>
                                        </div>
                                        <h6 className="font-medium text-center text-gray-700">
                                            {course.course_id.name}
                                        </h6>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

               
                    {/* Recently Uploaded Assignments */}
                    <RecentAssignments assignments={assignments} />

            </div>
        </div>
    );
};

export default Dashboard;