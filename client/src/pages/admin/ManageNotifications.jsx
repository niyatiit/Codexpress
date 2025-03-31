import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns';

const ManageNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 10;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const { data } = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      try {
        await deleteNotification(id);
        setNotifications(notifications.filter(notification => notification._id !== id));
      } catch (error) {
        console.error("Failed to delete notification:", error);
      }
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === 'draft' ? 'published' : 'draft';
    try {
      await updateNotificationStatus(id, newStatus);
      setNotifications(notifications.map(notification => 
        notification._id === id 
          ? { ...notification, status: newStatus } 
          : notification
      ));
    } catch (error) {
      console.error("Failed to update notification status:", error);
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = filteredNotifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );
  const totalPages = Math.ceil(filteredNotifications.length / notificationsPerPage);

  if (loading) {
    return (
      <div className="dashboard-body">
        <div className="text-center py-5">
          <div className="spinner-border text-main-600" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-body">
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
              <span className="text-main-600 fw-normal text-15">Manage Notifications</span>
            </li>
          </ul>
        </div>

        <div>
          <Link to="/admin/add/notification" className="btn btn-main rounded-pill py-9">
            <i className="ph ph-plus-circle me-2"></i> Add Notification
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between gap-8 flex-wrap">
          <h5 className="mb-0 text-gray-800">Notifications</h5>
          <div className="search-bar">
            <div className="input-group">
              <span className="input-group-text bg-transparent">
                <i className="ph ph-magnifying-glass"></i>
              </span>
              <input
                type="text"
                placeholder="Search notifications..."
                className="form-control text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          {notifications.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-4">
                <i className="ph ph-bell-slash text-gray-400" style={{ fontSize: '3rem' }}></i>
              </div>
              <h5 className="text-gray-800 mb-2">No Notifications Found</h5>
              <p className="text-gray-600 mb-4">You haven't created any notifications yet</p>
              <Link to="/admin/add/notification" className="btn btn-main rounded-pill">
                Create Your First Notification
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="text-gray-800">Title</th>
                      <th className="text-gray-800">Recipient Group</th>
                      <th className="text-gray-800">Date Sent</th>
                      <th className="text-gray-800">Status</th>
                      <th className="text-gray-800">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentNotifications.map((notification) => (
                      <tr key={notification._id}>
                        <td className="text-gray-800 fw-medium">{notification.title}</td>
                        <td className="text-gray-800">
                          {notification.recipientType === 'all' ? 'Everyone' : 
                           notification.recipientType === 'student' ? 'Students' : 'Faculty'}
                          {notification.course && ` (Course: ${notification.course.name})`}
                          {notification.batch && ` (Batch: ${notification.batch.name})`}
                        </td>
                        <td className="text-gray-800">
                          {format(new Date(notification.createdAt), 'MMM dd, yyyy hh:mm a')}
                        </td>
                        <td className="text-gray-800">
                          <span className={`badge ${
                            notification.status === 'published' 
                              ? 'bg-success' 
                              : 'bg-warning'
                          }`}>
                            {notification.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Link 
                              to={`/edit-notification/${notification._id}`}
                              className="btn btn-sm btn-primary"
                            >
                              <i className="ph ph-pencil-simple"></i>
                            </Link>
                            <button 
                              onClick={() => handleStatusChange(
                                notification._id, 
                                notification.status
                              )}
                              className={`btn btn-sm ${
                                notification.status === 'published'
                                  ? 'btn-secondary'
                                  : 'btn-success'
                              }`}
                            >
                              {notification.status === 'published' 
                                ? <i className="ph ph-eye-slash"></i>
                                : <i className="ph ph-eye"></i>}
                            </button>
                            <button 
                              onClick={() => handleDelete(notification._id)}
                              className="btn btn-sm btn-danger"
                            >
                              <i className="ph ph-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      >
                        Previous
                      </button>
                    </li>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <li 
                        key={page} 
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                      >
                        <button 
                          className="page-link"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageNotifications;