import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Hourglass } from 'react-loader-spinner';
import { format, parseISO } from 'date-fns';

const BatchDetails = () => {
    const { batchId } = useParams();
    const navigate = useNavigate();
    const [batch, setBatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState(null);
    const [faculty, setFaculty] = useState([]);
    const [enrollmentStatus, setEnrollmentStatus] = useState('not_enrolled');
    const [isLoadingAction, setIsLoadingAction] = useState(false);

    useEffect(() => {
        const fetchBatchDetails = async () => {
            try {
                setLoading(true);

                // Fetch batch details
                const batchResponse = await axios.get(`http://localhost:3000/batches/${batchId}`);
                setBatch(batchResponse.data.data);

                // Fetch course details
                if (batchResponse.data.data.course_id) {
                    const courseResponse = await axios.get(`http://localhost:3000/courses/${batchResponse.data.data.course_id}`);
                    setCourse(courseResponse.data.course);
                }

                // Fetch faculty details
                if (batchResponse.data.data.faculty_ids && batchResponse.data.data.faculty_ids.length > 0) {
                    const facultyId = batchResponse.data.data.faculty_ids[0];
                    const facultyResponse = await axios.get(`http://localhost:3000/faculty/${facultyId}`);
                    console.log("facultyResponse : ",facultyResponse.data.data)
                    setFaculty(facultyResponse);
                }

                // Check enrollment status (mock - replace with actual API call)
                const userId = JSON.parse(localStorage.getItem("user"))?.id;
                if (userId) {
                    const enrollmentRes = await axios.get(`http://localhost:3000/enrollments/user/${userId}`);
                    const isEnrolled = enrollmentRes.data.enrollments.some(
                        enrollment => enrollment.batch_id === batchId
                    );
                    setEnrollmentStatus(isEnrolled ? 'enrolled' : 'not_enrolled');
                }

            } catch (err) {
                setError('Failed to load batch details. Please try again later.');
                console.error('Error fetching batch details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBatchDetails();
    }, [batchId]);

    const handleEnroll = async () => {
        if (!window.confirm('Are you sure you want to enroll in this batch?')) return;

        try {
            setIsLoadingAction(true);
            const userId = JSON.parse(localStorage.getItem("user"))?.id;

            // Mock enrollment API call - replace with your actual endpoint
            await axios.post('http://localhost:3000/enrollments', {
                user_id: userId,
                batch_id: id,
                course_id: batch.course_id,
                enrollment_status: 'pending',
                payment_status: 'unpaid'
            });

            setEnrollmentStatus('pending');
            alert('Enrollment request submitted successfully!');
        } catch (err) {
            alert('Failed to enroll: ' + (err.response?.data?.message || err.message));
            console.error('Error enrolling:', err);
        } finally {
            setIsLoadingAction(false);
        }
    };

    const formatDate = (dateString) => {
        try {
            return format(parseISO(dateString), 'dd MMM yyyy');
        } catch {
            return 'Invalid date';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Hourglass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#306cce", "#72a1ed"]}
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="alert alert-error shadow-lg">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2L10 14zm2-6l2 2m0 0L12 8m2 2l-2 2M12 8l-2-2m2 2L12 8z"></path>
                        </svg>
                        <span>{error}</span>
                    </div>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!batch) {
        return (
            <div className="p-6">
                <div className="alert alert-warning shadow-lg">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>Batch not found</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
               <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 mb-3 text-gray-200 bg-zinc-200 rounded-full transition flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back
                </button>
                <div className='bg-white rounded-lg p-16 shadow-sm'>
            <div className="flex justify-between items-start mb-26 ">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{batch.name}</h1>
                    <div className="flex items-center mt-2 space-x-4">
                        {course && (
                            <span className="text-sm text-gray-600">
                                <strong>Course:</strong> {course.name}
                            </span>
                        )}
                        <span className="text-sm text-gray-600">
                            <strong>Batch Type:</strong> {batch.batch_type}
                        </span>
                    </div>
                </div>
             
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
                {/* Batch Information Card */}
                <div className="bg-blue-50 rounded-lg shadow-sm p-16">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Batch Information</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-blue-500 ">Start Date</p>
                            <p className="font-medium">{formatDate(batch.start_date)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-blue-500 ">End Date</p>
                            <p className="font-medium">{formatDate(batch.end_date)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-blue-500 ">Duration</p>
                            <p className="font-medium">6 months</p>
                        </div>
                        {/* <div>
                            <p className="text-sm text-blue-500 ">Seats Available</p>
                            <p className="font-medium">
                                {batch.seats_available} of {batch.total_seats}
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${((batch.total_seats - batch.seats_available) / batch.total_seats) * 100}%` }}
                                ></div>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* Course Overview Card */}
                <div className="bg-blue-50 rounded-lg shadow-sm p-16">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Course Overview</h3>
                    {course ? (
                        <>
                            <p className="text-gray-700 mb-4">{course.description || batch.batch_description}</p>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm text-blue-500 ">Course Level</p>
                                    <p className="font-medium">{course.level || 'Intermediate'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-blue-500 ">Prerequisites</p>
                                    <p className="font-medium">
                                        {course.prerequisites?.join(', ') || 'Basic programming knowledge'}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500">No course information available</p>
                    )}
                </div>

                {/* Faculty Card */}
                {/* <div className="bg-white rounded-lg p-16">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Faculty</h3>
                    {faculty ? (
                            <div key={faculty._id} className="flex items-center mb-4">
                                <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-medium text-lg">
                                    </span>
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-900">{faculty.user_id?.username} uid</p>
                                    <p className="text-sm text-blue-500 ">{faculty.email}</p>
                                    <p className="text-sm text-blue-500 ">{faculty.department || 'Software Development'}</p>
                                </div>
                            </div>
                    ) : (
                        <p className="text-gray-500">No faculty assigned yet</p>
                    )}
                </div> */}
            </div>

            {/* Enrollment Section */}
            {/* <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Enrollment</h3>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0">
                        {enrollmentStatus === 'enrolled' ? (
                            <div className="flex items-center">
                                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-green-600 font-medium">You are enrolled in this batch</span>
                            </div>
                        ) : enrollmentStatus === 'pending' ? (
                            <div className="flex items-center">
                                <svg className="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-yellow-600 font-medium">Your enrollment is pending approval</span>
                            </div>
                        ) : (
                            <p className="text-gray-700">You are not currently enrolled in this batch</p>
                        )}
                    </div>

                    {enrollmentStatus === 'not_enrolled' && (
                        <button
                            onClick={handleEnroll}
                            disabled={isLoadingAction || batch.seats_available <= 0}
                            className={`px-6 py-3 rounded-md font-medium text-white ${isLoadingAction || batch.seats_available <= 0
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 transition'
                                }`}
                        >
                            {isLoadingAction ? (
                                'Processing...'
                            ) : batch.seats_available <= 0 ? (
                                'Batch Full'
                            ) : (
                                'Enroll Now'
                            )}
                        </button>
                    )}
                </div>
            </div> */}

        </div>
        </div>
    );
};

export default BatchDetails;