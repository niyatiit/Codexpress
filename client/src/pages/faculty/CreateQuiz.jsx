import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([]);

  return (
    <div className="dashboard-body">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb mb-4">
        <ul className="flex-align gap-4">
          <li>
            <Link
              to="/faculty"
              className="text-gray-800 fw-normal text-15 hover-text-main-600"
            >
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-500 fw-normal d-flex">
              <i className="ph ph-caret-right"></i>
            </span>
          </li>
          <li>
            <span className="text-main-600 fw-normal text-15">Create Quiz</span>
          </li>
        </ul>
      </div>

      {/* Quiz Form */}
      <div className="card p-36 mb-6">
        <h2 className="text-xl font-semibold mb-4">Quiz Details</h2>
        <form className="flex flex-col gap-4">
          {/* Quiz Title */}
          <div className="form-group">
            <label htmlFor="quizTitle" className="block font-medium mb-2">
              Quiz Title
            </label>
            <input
              type="text"
              id="quizTitle"
              className="form-input border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Enter quiz title"
            />
          </div>

          {/* Course Selection */}
          <div className="form-group">
            <label htmlFor="course" className="block font-medium mb-2">
              Course
            </label>
            <select
              id="course"
              className="form-select border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="">Select Course</option>
              <option value="Java">Java</option>
              <option value="React">React</option>
              <option value="Node.js">Node.js</option>
            </select>
          </div>

          {/* Batch Selection */}
          <div className="form-group">
            <label htmlFor="batch" className="block font-medium mb-2">
              Batch
            </label>
            <select
              id="batch"
              className="form-select border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="">Select Batch</option>
              <option value="Batch A">Batch A</option>
              <option value="Batch B">Batch B</option>
              <option value="Batch C">Batch C</option>
            </select>
          </div>

          {/* Duration */}
          <div className="form-group">
            <label htmlFor="duration" className="block font-medium mb-2">
              Duration (in minutes)
            </label>
            <input
              type="number"
              id="duration"
              className="form-input border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Enter duration"
            />
          </div>

          {/* Total Marks */}
          <div className="form-group">
            <label htmlFor="totalMarks" className="block font-medium mb-2">
              Total Marks
            </label>
            <input
              type="number"
              id="totalMarks"
              className="form-input border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Enter total marks"
            />
          </div>
        </form>
      </div>

      {/* Add Questions */}
      <div className="card p-36">
        <h2 className="text-xl font-semibold mb-4">Add Questions</h2>
        <form className="flex flex-col gap-4">
          {/* Question Text */}
          <div className="form-group">
            <label htmlFor="questionText" className="block font-medium mb-2">
              Question Text
            </label>
            <input
              type="text"
              id="questionText"
              className="form-input border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Enter question"
            />
          </div>

          {/* Options */}
          {[...Array(4)].map((_, index) => (
            <div className="form-group" key={index}>
              <label
                htmlFor={`option${index}`}
                className="block font-medium mb-2"
              >
                Option {index + 1}
              </label>
              <input
                type="text"
                id={`option${index}`}
                className="form-input border border-gray-300 rounded px-3 py-2 w-full"
                placeholder={`Enter option ${index + 1}`}
              />
            </div>
          ))}

          {/* Correct Option */}
          <div className="form-group">
            <label htmlFor="correctOption" className="block font-medium mb-2">
              Correct Option
            </label>
            <select
              id="correctOption"
              className="form-select border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="">Select Correct Option</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
              <option value="Option 4">Option 4</option>
            </select>
          </div>

          {/* Add Question Button */}
          <button
            type="button"
            className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Question
          </button>
        </form>
      </div>

      {/* Preview Questions */}
      <div className="card p-36 mt-6">
        <h2 className="text-xl font-semibold mb-4">Preview Questions</h2>
        {questions.length === 0 ? (
          <p className="text-gray-500">No questions added yet.</p>
        ) : (
          <ul className="list-disc pl-6">
            {questions.map((question, index) => (
              <li key={index} className="mb-2">
                <strong>Q{index + 1}:</strong> {question.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
