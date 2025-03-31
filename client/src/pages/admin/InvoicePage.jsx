import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InvoicePage = () => {
  const { invoiceId } = useParams();
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/enrollments/user/${invoiceId}`);
        setEnrollment(response.data.data);
      } catch (err) {
        console.error('Error fetching enrollment:', err);
        setError('Failed to load invoice details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollment();
  }, [invoiceId]);

  const downloadInvoice = () => {
    if (!enrollment) return;

    const doc = new jsPDF();
    
    // Invoice Header
    doc.setFontSize(18);
    doc.text('INVOICE', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Invoice #: ${enrollment._id.slice(-8).toUpperCase()}`, 15, 30);
    doc.text(`Date: ${format(new Date(), 'MMM dd, yyyy')}`, 15, 38);
    
    // Company Info
    doc.setFontSize(14);
    doc.text('Your Institute Name', 15, 50);
    doc.setFontSize(10);
    doc.text('123 Education Street', 15, 58);
    doc.text('Learning City, LC 12345', 15, 66);
    doc.text('Phone: (123) 456-7890', 15, 74);
    doc.text('Email: info@institute.com', 15, 82);
    
    // Student Info
    doc.setFontSize(14);
    doc.text('Bill To:', 15, 100);
    doc.setFontSize(10);
    doc.text(enrollment.user.name, 15, 108);
    doc.text(enrollment.user.email, 15, 116);
    doc.text(`Student ID: ${enrollment.user._id.slice(-8)}`, 15, 124);
    
    // Invoice Table
    doc.autoTable({
      startY: 140,
      head: [['Description', 'Quantity', 'Unit Price', 'Amount']],
      body: enrollment.courses.map(course => [
        course.course.name,
        '1',
        `$${course.course.price || '0.00'}`,
        `$${course.course.price || '0.00'}`
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] }
    });
    
    // Total
    const total = enrollment.courses.reduce((sum, course) => sum + (course.course.price || 0), 0);
    doc.text(`Total: $${total.toFixed(2)}`, 160, doc.lastAutoTable.finalY + 20);
    
    // Footer
    doc.setFontSize(8);
    doc.text('Thank you for your payment!', 105, 280, { align: 'center' });
    
    doc.save(`invoice_${enrollment._id.slice(-8)}.pdf`);
  };

  if (loading) {
    return (
      <div className="dashboard-body">
        <div className="flex-center" style={{ height: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-body">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="dashboard-body">
        <div className="alert alert-warning" role="alert">
          Invoice not found
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-body">
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
            <Link to="/admin/reports/enrollments" className="text-gray-200 fw-normal text-15 hover-text-main-600">
              Reports
            </Link>
          </li>
          <li>
            <span className="text-gray-500 fw-normal d-flex">
              <i className="ph ph-caret-right"></i>
            </span>
          </li>
          <li>
            <span className="text-main-600 fw-normal text-15">Invoice</span>
          </li>
        </ul>
      </div>

      <div className="card shadow-sm mb-24">
        <div className="card-header bg-white border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Invoice #{enrollment._id.slice(-8).toUpperCase()}</h5>
            <button onClick={downloadInvoice} className="btn btn-primary btn-sm">
              <i className="fas fa-download me-2"></i> Download Invoice
            </button>
          </div>
        </div>

        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <h6>Institute Information</h6>
              <p className="mb-1">Your Institute Name</p>
              <p className="mb-1">123 Education Street</p>
              <p className="mb-1">Learning City, LC 12345</p>
              <p className="mb-1">Phone: (123) 456-7890</p>
              <p className="mb-0">Email: info@institute.com</p>
            </div>
            <div className="col-md-6 text-md-end">
              <h6>Student Information</h6>
              <p className="mb-1"><strong>Name:</strong> {enrollment.user.name}</p>
              <p className="mb-1"><strong>Email:</strong> {enrollment.user.email}</p>
              <p className="mb-1"><strong>Student ID:</strong> {enrollment.user._id.slice(-8)}</p>
              <p className="mb-0"><strong>Invoice Date:</strong> {format(new Date(), 'MMM dd, yyyy')}</p>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="bg-light">
                <tr>
                  <th width="50%">Course</th>
                  <th width="15%">Quantity</th>
                  <th width="15%">Unit Price</th>
                  <th width="20%">Amount</th>
                </tr>
              </thead>
              <tbody>
                {enrollment.courses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.course.name}</td>
                    <td>1</td>
                    <td>${course.course.price || '0.00'}</td>
                    <td>${course.course.price || '0.00'}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-end"><strong>Total</strong></td>
                  <td>
                    <strong>
                      $
                      {enrollment.courses
                        .reduce((sum, course) => sum + (course.course.price || 0), 0)
                        .toFixed(2)}
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-4 p-3 bg-light rounded">
            <h6>Payment Information</h6>
            <p className="mb-1">
              <strong>Status:</strong> 
              <span className={`badge bg-${
                enrollment.payment_status === 'paid' ? 'success' : 
                enrollment.payment_status === 'pending' ? 'warning' : 'danger'
              } ms-2`}>
                {enrollment.payment_status?.charAt(0).toUpperCase() + enrollment.payment_status?.slice(1)}
              </span>
            </p>
            <p className="mb-1"><strong>Payment Method:</strong> {enrollment.payment_method || 'Not specified'}</p>
            {enrollment.payment_date && (
              <p className="mb-0">
                <strong>Payment Date:</strong> {format(new Date(enrollment.payment_date), 'MMM dd, yyyy')}
              </p>
            )}
          </div>

          <div className="mt-4 text-center">
            <p className="text-muted">Thank you for your payment!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;