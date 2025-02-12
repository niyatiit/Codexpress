import React from "react";
import { Link } from "react-router-dom";

const AddBatch = () => {
  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between gap-4 flex-wrap">
        <div className="mb-6">
          <ul className="flex gap-4 items-center">
            <li>
              <Link to="/admin" className="text-gray-400 hover:text-blue-600 text-sm font-normal">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 font-normal">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-blue-600 font-normal text-sm">Add New Batch</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="border-b border-gray-200 mb-4 flex justify-between">
          <h5 className="text-xl font-semibold">Batch Details</h5>
        </div>
        <div>
          <form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Batch Information */}
              <div>
                <label className="font-medium text-lg mb-2 block">Batch Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter batch name"
                  name="batchName"
                />
              </div>

              <div>
                <label className="font-medium text-lg mb-2 block">Course</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" name="course">
                  <option disabled selected>Select Course</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Business Management">Business Management</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-lg mb-2 block">Start Date</label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  name="startDate"
                />
              </div>

              <div>
                <label className="font-medium text-lg mb-2 block">End Date</label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  name="endDate"
                />
              </div>

              {/* Timing and Days */}
              <div>
                <label className="font-medium text-lg mb-2 block">Batch Timing</label>
                <input
                  type="time"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  name="batchTiming"
                />
              </div>

              <div>
                <label className="font-medium text-lg mb-2 block">Days</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  name="days"
                  multiple
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>

              {/* Batch Capacity and Faculty */}
              <div>
                <label className="font-medium text-lg mb-2 block">Batch Capacity</label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter batch capacity"
                  name="capacity"
                />
              </div>

              <div>
                <label className="font-medium text-lg mb-2 block">Assigned Faculty</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  name="faculty"
                >
                  <option disabled selected>Select Faculty</option>
                  <option value="Dr. John Doe">Dr. John Doe</option>
                  <option value="Prof. Jane Smith">Prof. Jane Smith</option>
                  <option value="Dr. Mike Brown">Dr. Mike Brown</option>
                </select>
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="font-medium text-lg mb-2 block">Description</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter batch description"
                  name="description"
                ></textarea>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Link to="/batches" className="btn border border-blue-600 text-blue-600 px-6 py-3 rounded-lg">
                  Cancel
                </Link>
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                  Save Batch
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBatch;
