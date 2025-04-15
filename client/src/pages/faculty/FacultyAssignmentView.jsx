import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    User,
    BookOpen,
    Users,
    Calendar,
    Clock,
    Plus,
    Pencil,
    Trash,
    Funnel,
    MagnifyingGlass,
    ArrowLeft,
    ArrowRight
} from "phosphor-react";

const FacultyAssignmentView = () => {
    const [faculties, setFaculties] = useState([]);
    const [courses, setCourses] = useState([]);
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("courses"); // 'courses' or 'batches'
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch all data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [facultiesRes, coursesRes, batchesRes] = await Promise.all([
                    axios.get("http://localhost:3000/faculty"),
                    axios.get("http://localhost:3000/courses"),
                    axios.get("http://localhost:3000/batches")
                ]);

                setFaculties(facultiesRes.data.faculties);
                setCourses(coursesRes.data.courses);
                setBatches(batchesRes.data.batches);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Get faculty name by ID
    const getFacultyName = (facultyId) => {
        const faculty = faculties.find(f => f._id === facultyId);
        return faculty ? `${faculty.user_id.first_name} ${faculty.user_id.last_name}` : "Not Assigned";
    };

    // Get course name by ID
    const getCourseName = (courseId) => {
        const course = courses.find(c => c._id === courseId);
        return course ? course.name : "Unknown Course";
    };

    // Filter data based on search term
    const filteredData = activeTab === "courses"
        ? courses.filter(course =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (course.faculty_ids && course.faculty_ids.some(facultyId =>
                getFacultyName(facultyId).toLowerCase().includes(searchTerm.toLowerCase()))))
        : batches.filter(batch =>
            batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            getCourseName(batch.course_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
            (batch.faculty_ids && batch.faculty_ids.some(facultyId =>
                getFacultyName(facultyId).toLowerCase().includes(searchTerm.toLowerCase()))));

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Handle unassign faculty
    const handleUnassign = async (type, id, facultyId) => {
        if (window.confirm(`Are you sure you want to unassign this faculty?`)) {
            try {
                setLoading(true);
                const endpoint = `/courses/${id}/unassign-faculty/${facultyId}`

                await axios.delete(`http://localhost:3000${endpoint}`);

                // Refresh data
                const [coursesRes, batchesRes] = await Promise.all([
                    axios.get("http://localhost:3000/courses"),
                    axios.get("http://localhost:3000/batches")
                ]);

                setCourses(coursesRes.data.courses);
                setBatches(batchesRes.data.batches);
            } catch (error) {
                console.error("Error unassigning faculty:", error);
                setError("Failed to unassign faculty. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="dashboard-body p-36">
            <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
                <div className="breadcrumb mb-24">
                    <ul className="flex-align gap-4">
                        <li>
                            <Link to="/admin" className="text-gray-800 fw-normal text-15 hover-text-main-600">
                                Home
                            </Link>
                        </li>
                        <li>
                            <span className="text-gray-500 fw-normal d-flex">
                                <i className="ph ph-caret-right"></i>
                            </span>
                        </li>
                        <li>
                            <span className="text-main-600 fw-normal text-15">View All Course Assignment</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-end md:flex-row md:items-center mb-6 gap-4">

                <div className="flex  gap-3">
                    <Link
                        to="/admin/assign/course"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={18} /> Assign Faculty
                    </Link>
                </div>
            </div>

            {/* Tabs and Search */}
            <div className="bg-white flex justify-between rounded-lg shadow-sm p-4 my-16">
                <div>
                    <h1 className="text-lg font-bold text-gray-800">Faculty Assignments</h1>
                    <p className="text-zinc-500 text-sm ">
                        View and manage faculty assignments to courses
                    </p>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                    {/* Search */}
                    <div className="relative w-full flex gap-3 items-center md:w-64">
                        <div className="absolute r-0 p-2">
                            <MagnifyingGlass size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder={`Search ${activeTab}...`}
                            className="w-full py-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <XCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            {activeTab === "courses" ? (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {/* Course Assignments Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-500">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white px-36 uppercase tracking-wider">
                                        Course
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Assigned Faculty
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentItems.length > 0 ? (
                                    currentItems.map((course) => (
                                        <tr key={course._id} className="hover:bg-gray-50 ">
                                            <td className="px-6 py-4 whitespace-nowrap px-36 ">
                                                <div className="text-sm font-medium text-gray-900">{course.name}</div>
                                                <div className="text-sm text-gray-500">{course.code}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {course.faculty_ids && course.faculty_ids.length > 0 ? (
                                                    <div className="space-y-2">
                                                        {course.faculty_ids.map(facultyId => (
                                                            <div key={facultyId} className="flex items-center justify-between">
                                                                <span className="text-sm text-gray-800">
                                                                    {getFacultyName(facultyId)}
                                                                </span>
                                                                <button
                                                                    onClick={() => handleUnassign("course", course._id, facultyId)}
                                                                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                                    title="Unassign"
                                                                >
                                                                    <Trash size={16} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-500 italic">No faculty assigned</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link
                                                    to={`/admin/assign/course?courseId=${course._id}`}
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                >
                                                    <Pencil size={16} className="inline mr-1" /> Assign
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No courses found matching your criteria
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Next
                                </button>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                                        <span className="font-medium">
                                            {Math.min(indexOfLastItem, filteredData.length)}
                                        </span>{' '}
                                        of <span className="font-medium">{filteredData.length}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <button
                                            onClick={() => setCurrentPage(1)}
                                            disabled={currentPage === 1}
                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            <span className="sr-only">First</span>
                                            <ArrowLeft size={16} />
                                        </button>
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNum
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                        <button
                                            onClick={() => setCurrentPage(totalPages)}
                                            disabled={currentPage === totalPages}
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            <span className="sr-only">Last</span>
                                            <ArrowRight size={16} />
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {/* Batch Assignments Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Batch
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Course
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Schedule
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Assigned Faculty
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentItems.length > 0 ? (
                                    currentItems.map((batch) => (
                                        <tr key={batch._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{batch.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {new Date(batch.start_date).toLocaleDateString()} - {new Date(batch.end_date).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {getCourseName(batch.course_id)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {batch.batch_type}
                                            </td>
                                            <td className="px-6 py-4">
                                                {batch.faculty_ids && batch.faculty_ids.length > 0 ? (
                                                    <div className="space-y-2">
                                                        {batch.faculty_ids.map(facultyId => (
                                                            <div key={facultyId} className="flex items-center justify-between">
                                                                <span className="text-sm text-gray-800">
                                                                    {getFacultyName(facultyId)}
                                                                </span>
                                                                <button
                                                                    onClick={() => handleUnassign("batch", batch._id, facultyId)}
                                                                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                                    title="Unassign"
                                                                >
                                                                    <Trash size={16} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-500 italic">No faculty assigned</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link
                                                    to={`/admin/assign-faculty?batchId=${batch._id}`}
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                >
                                                    <Pencil size={16} className="inline mr-1" /> Assign
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No batches found matching your criteria
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination (same as above) */}
                    {/* ... */}
                </div>
            )}
        </div>
    );
};

export default FacultyAssignmentView;