import React from "react";
import { Link } from "react-router-dom";

const ViewResources = () => {
  // Sample resource data
  const resources = [
    {
      id: 1,
      name: "Web Development Notes",
      type: "PDF",
      size: "2.5MB",
      uploadedBy: "Dr. John Doe",
      date: "2024-01-15",
      icon: "/assets/images/icons/file-icon1.png",
    },
    {
      id: 2,
      name: "React Tutorial",
      type: "Video",
      size: "150MB",
      uploadedBy: "Prof. Jane Smith",
      date: "2024-02-10",
      icon: "/assets/images/icons/file-icon2.png",
    },
    {
      id: 3,
      name: "JavaScript Basics",
      type: "PDF",
      size: "1.8MB",
      uploadedBy: "Dr. Mike Brown",
      date: "2024-03-05",
      icon: "/assets/images/icons/file-icon3.png",
    },
    {
      id: 4,
      name: "CSS Frameworks",
      type: "Document",
      size: "3.2MB",
      uploadedBy: "Dr. John Doe",
      date: "2024-04-20",
      icon: "/assets/images/icons/file-icon4.png",
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
            <li className="text-blue-600">View Resources</li>
          </ul>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="card mb-8">
        <div className="card-header border-b border-gray-200 p-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            {/* Search Bar */}
            <form className="w-full sm:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <i className="ph ph-magnifying-glass text-xl"></i>
                </span>
              </div>
            </form>

            {/* Filter and Sort Options */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Sort by:</span>
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200">
                  <option value="date">Date</option>
                  <option value="name">Name</option>
                  <option value="type">Type</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">View:</span>
                <button className="p-2 text-gray-600 hover:text-blue-600">
                  <i className="ph ph-squares-four text-xl"></i>
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600">
                  <i className="ph ph-list text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="card hover:shadow-lg transition-shadow duration-200">
            <div className="card-body p-6">
              <div className="flex flex-col items-center text-center">
                <img src={resource.icon} alt={resource.type} className="w-16 h-16 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">{resource.name}</h3>
                <p className="text-sm text-gray-500">{resource.type}</p>
                <p className="text-sm text-gray-500">{resource.size}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Uploaded by <span className="font-medium">{resource.uploadedBy}</span>
                </p>
                <p className="text-sm text-gray-500">{resource.date}</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <nav className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
            1
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
            2
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
            3
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ViewResources;