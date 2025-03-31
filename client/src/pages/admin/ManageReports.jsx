import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { format, parseISO, startOfDay, endOfDay } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManageReports = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByDate, setSortByDate] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrollmentsRes, coursesRes] = await Promise.all([
          axios.get("http://localhost:3000/enrollments/users"),
          axios.get("http://localhost:3000/courses")
        ]);

        // Validate and process enrollments data
        const enrollmentsData = enrollmentsRes?.data?.data || [];
        const processedData = enrollmentsData.map(enrollment => ({
          ...enrollment,
          user: enrollment.user || { name: "Unknown", email: "" },
          courses: (enrollment.courses || []).map(course => ({
            ...course,
            course: course.course || { name: "Unknown" },
            enrolled_at: course.enrolled_at ? new Date(course.enrolled_at) : new Date(),
            payment_status: course.payment_status || "unknown"
          }))
        }));

        // Validate and process courses data
        const coursesData = coursesRes?.data?.data || [];
        
        setEnrollments(processedData);
        setCoursesList(coursesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response?.data?.message || "Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter and sort enrollments with all safety checks
  const filteredEnrollments = (enrollments || [])
    .map((enrollment) => ({
      ...enrollment,
      courses: (enrollment.courses || [])
        .filter((course) => {
          const searchFields = [
            enrollment.user?.name || "",
            enrollment.user?.email || "",
            course.course?.name || "",
            course.payment_status || ""
          ].join(" ").toLowerCase();

          const matchesSearch = searchFields.includes(searchQuery.toLowerCase());
          const matchesDate = (!startDate || !endDate) || 
            (course.enrolled_at >= startOfDay(startDate) && 
            course.enrolled_at <= endOfDay(endDate))
          const matchesCourse = selectedCourse === "all" || 
            course.course?._id === selectedCourse;
          const matchesPaymentStatus = selectedPaymentStatus === "all" || 
            course.payment_status === selectedPaymentStatus;

          return matchesSearch && matchesDate && matchesCourse && matchesPaymentStatus;
        })
    }))
    .filter((enrollment) => (enrollment.courses || []).length > 0)
    .sort((a, b) => {
      const dateA = a.courses[0]?.enrolled_at || new Date(0);
      const dateB = b.courses[0]?.enrolled_at || new Date(0);
      return sortByDate === "asc" ? dateA - dateB : dateB - dateA;
    });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEnrollments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEnrollments.length / itemsPerPage);

  const downloadPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Report title and date
      doc.setFontSize(18);
      doc.text("Student Enrollment Report", 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on: ${format(new Date(), 'MM/dd/yyyy HH:mm')}`, 14, 22);
      
      // Filter information
      let filterInfo = "Filters: ";
      if (searchQuery) filterInfo += `Search: "${searchQuery}" `;
      if (startDate && endDate) filterInfo += `Date Range: ${format(startDate, 'MM/dd/yyyy')} - ${format(endDate, 'MM/dd/yyyy')} `;
      if (selectedCourse !== "all") {
        const course = coursesList.find(c => c._id === selectedCourse);
        filterInfo += `Course: ${course?.name || selectedCourse} `;
      }
      if (selectedPaymentStatus !== "all") filterInfo += `Payment: ${selectedPaymentStatus} `;
      
      doc.text(filterInfo, 14, 28);
      
      // Table data
      const tableColumn = ["Name", "Email", "Course", "Payment Status", "Enrollment Date"];
      const tableRows = [];

      filteredEnrollments.forEach((enrollment) => {
        (enrollment.courses || []).forEach((course) => {
          tableRows.push([
            enrollment.user?.name || "Unknown",
            enrollment.user?.email || "",
            course.course?.name || "Unknown",
            (course.payment_status || "unknown").charAt(0).toUpperCase() + (course.payment_status || "").slice(1),
            course.enrolled_at ? format(course.enrolled_at, 'MM/dd/yyyy') : "Unknown"
          ]);
        });
      });

      // Add table to PDF
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        }
      });

      doc.save(`Student_Enrollment_Report_${format(new Date(), 'yyyyMMdd_HHmm')}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const downloadExcel = () => {
    try {
      // Prepare data
      const data = [];
      
      // Add headers
      data.push(["Name", "Email", "Course", "Payment Status", "Enrollment Date"]);
      
      // Add rows
      filteredEnrollments.forEach((enrollment) => {
        (enrollment.courses || []).forEach((course) => {
          data.push([
            enrollment.user?.name || "Unknown",
            enrollment.user?.email || "",
            course.course?.name || "Unknown",
            (course.payment_status || "unknown").charAt(0).toUpperCase() + (course.payment_status || "").slice(1),
            course.enrolled_at ? format(course.enrolled_at, 'MM/dd/yyyy') : "Unknown"
          ]);
        });
      });
      
      // Create workbook
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(data);
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, "Enrollments");
      
      // Generate and download file
      XLSX.writeFile(wb, `Enrollment_Report_${format(new Date(), 'yyyyMMdd_HHmm')}.xlsx`);
    } catch (error) {
      console.error("Error generating Excel:", error);
      alert("Failed to generate Excel file. Please try again.");
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setDateRange([null, null]);
    setSelectedCourse("all");
    setSelectedPaymentStatus("all");
    setCurrentPage(1);
  };

  if (loading) return (
    <div className="dashboard-body">
      <div className="flex-center" style={{ height: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="dashboard-body">
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    </div>
  );

  return (
    <div className="dashboard-body">
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/admin" className="text-gray-200 fw-normal text-15 hover-text-main-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Enrollment Reports</span>
            </li>
          </ul>
        </div>
        <div className="flex-align gap-8 mb-24">
          <button 
            onClick={downloadPDF}
            className="btn btn-danger btn-sm"
            disabled={filteredEnrollments.length === 0}
          >
            <i className="fas fa-file-pdf me-2"></i> Export PDF
          </button>
          <button 
            onClick={downloadExcel}
            className="btn btn-success btn-sm"
            disabled={filteredEnrollments.length === 0}
          >
            <i className="fas fa-file-excel me-2"></i> Export Excel
          </button>
        </div>
      </div>

      <div className="card shadow-sm mb-24">
        <div className="card-header bg-white border-bottom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h5 className="mb-0">Enrollment Records</h5>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-transparent">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search by name, email, or course"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="card-body border-bottom">
          <div className="row g-3 flex justify-center items-end">
            <div className="col-md-3">
              <label className="form-label">Date Range</label> <br />
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                  setCurrentPage(1);
                }}
                isClearable={true}
                placeholderText="Select date range"
                className="form-control"
                maxDate={new Date()}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Course</label>
              <select
                className="form-select"
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Courses</option>
                {coursesList.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name || "Unknown Course"}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Payment Status</label>
              <select
                className="form-select"
                value={selectedPaymentStatus}
                onChange={(e) => {
                  setSelectedPaymentStatus(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button
                onClick={resetFilters}
                className="btn bg-blue-500 w-100"
              >
                <i className="fas fa-filter-circle-xmark me-2"></i> Reset Filters
              </button>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th width="15%" className="px-5">
                    <div className="d-flex align-items-center">
                      Student
                      <button 
                        className="btn btn-sm btn-link p-0 ms-2"
                        onClick={() => setSortByDate(sortByDate === "asc" ? "desc" : "asc")}
                      >
                        <i className={`fas fa-sort-${sortByDate === "asc" ? "up" : "down"}`}></i>
                      </button>
                    </div>
                  </th>
                  <th width="15%">Email</th>
                  <th width="25%">Course</th>
                  <th width="15%">Payment Status</th>
                  <th width="15%">Enrolled On</th>
                  <th width="20%">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((enrollment, index) =>
                    (enrollment.courses || []).map((course, courseIndex) => (
                      <tr key={`${enrollment._id || index}-${courseIndex}`}>
                        <td className="px-5">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1">
                              <h6 className="mb-0">{enrollment.user?.name || "Unknown"}</h6>
                            </div>
                          </div>
                        </td>
                        <td>{enrollment.user?.email || ""}</td>
                        <td>
                          <span className="text-info">
                            {course.course?.name || "Unknown"}
                          </span>
                        </td>
                        <td>
                          <span className={`badge bg-${
                            course.payment_status === 'paid' ? 'success' : 
                            course.payment_status === 'pending' ? 'warning' : 'danger'
                          }`}>
                            {(course.payment_status || "unknown").charAt(0).toUpperCase() + (course.payment_status || "").slice(1)}
                          </span>
                        </td>
                        <td>{course.enrolled_at ? format(course.enrolled_at, 'dd/MM/yyyy') : "Unknown"}</td>
                        <td>
                          <Link
                            to={`/admin/reports/invoice/${enrollment._id}`}
                            className="btn btn-sm btn-primary"
                            title="View Details"
                          >
                            <i className="fas fa-eye"></i>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No records found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {filteredEnrollments.length > itemsPerPage && (
          <div className="card-footer bg-white border-top">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredEnrollments.length)} of {filteredEnrollments.length} entries
              </div>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageReports;