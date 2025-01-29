import React from "react";
import { Link } from "react-router-dom";

const ManageCourses = () => {
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
              <span className="text-main-600 fw-normal text-15">Manage Courses</span>
            </li>
          </ul>
        </div>

        <div className="flex-align justify-content-end gap-8">
          <Link to="/admin/add/course" className="btn btn-main rounded-pill py-9">
            Add New Course
          </Link>
        </div>
      </div>

      <div className="card w-100" style={{ padding: "0" }}>
        <div className="card-header border-bottom border-gray-100 flex-align gap-8">
          <h5 className="mb-0">Courses List</h5>
        </div>
        <div className="card-body" style={{ padding: "0" }}>
          <table className="table table-hover w-100" style={{ marginBottom: "0" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Course Title</th>
                <th>Category</th>
                <th>Level</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example of a course row */}
              <tr>
                <td>1</td>
                <td>Introduction to React</td>
                <td>Computer Science</td>
                <td>Beginner</td>
                <td>$199</td>
                <td>
                  <Link to="/admin/edit/course/1" className="btn btn-outline-main py-9 rounded-pill">
                    Edit
                  </Link>
                  <button className="btn btn-outline-danger py-9 rounded-pill ml-2">
                    Delete
                  </button>
                </td>
              </tr>
              {/* Repeat the above row for more courses */}
              <tr>
                <td>2</td>
                <td>Advanced JavaScript</td>
                <td>Computer Science</td>
                <td>Advanced</td>
                <td>$249</td>
                <td>
                  <Link to="/admin/edit/course/2" className="btn btn-outline-main py-9 rounded-pill">
                    Edit
                  </Link>
                  <button className="btn btn-outline-danger py-9 rounded-pill ml-2">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCourses;
