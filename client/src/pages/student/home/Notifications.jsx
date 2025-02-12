import React from "react";
import { Link } from "react-router-dom";

const Notifications = () => {
  // Sample notification data
  const notifications = [
    {
      id: 1,
      title: "New Assignment Uploaded",
      message: "A new assignment for Web Development has been uploaded. Deadline: 2024-05-10.",
      date: "2024-04-25",
      time: "10:15 AM",
      isRead: false,
    },
    {
      id: 2,
      title: "Class Rescheduled",
      message: "The class on React Development scheduled for 2024-04-28 has been rescheduled to 2024-04-30.",
      date: "2024-04-24",
      time: "03:45 PM",
      isRead: true,
    },
    {
      id: 3,
      title: "Quiz Results Published",
      message: "The results for the JavaScript Basics quiz are now available. Check your grades in the dashboard.",
      date: "2024-04-23",
      time: "09:00 AM",
      isRead: false,
    },
    {
      id: 4,
      title: "New Resource Available",
      message: "A new resource for CSS Frameworks has been uploaded. Download it from the resources section.",
      date: "2024-04-22",
      time: "11:30 AM",
      isRead: true,
    },
  ];

  return (
    <div className="dashboard-body p-8 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="breadcrumb-with-buttons mb-8 flex justify-between items-center">
        <div className="breadcrumb">
          <ul className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/student-dashboard" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-blue-600">Notifications</li>
          </ul>
        </div>
      </div>

      {/* Notifications Header */}
      <div className="card my-18 p-3">
        <div className="card-header border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          <p className="text-sm text-gray-500 mt-1">Stay updated with the latest announcements and activities.</p>
        </div>
      </div>

      {/* Notifications List */}
      <div className="card p-12">
        <div className="card-body p-16">
          {/* Filter Options */}
          <div className="flex justify-between items-center mb-36">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                All
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200">
                Unread
              </button>
            </div>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200">
              Mark All as Read
            </button>
          </div>

          {/* Notifications */}
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg ${
                  notification.isRead ? "bg-white" : "bg-blue-50"
                } border border-gray-200 hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {notification.date} | {notification.time}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;