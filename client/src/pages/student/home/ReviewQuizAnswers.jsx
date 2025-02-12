import React from "react";
import { Link } from "react-router-dom";

const ReviewQuizAnswers = () => {
  const quizDetails = {
    title: "React Fundamentals Quiz",
    date: "2025-02-12",
    totalQuestions: 10,
    attempted: 10,
    correct: 7,
    incorrect: 3,
  };

 
  const questions = [
    {
      question: "What is React?",
      answer: "A JavaScript library for building user interfaces",
      correctAnswer: "A JavaScript library for building user interfaces",
      isCorrect: true,
      explanation: "React is a popular JavaScript library used for building UIs, maintained by Facebook.",
    },
    {
      question: "What is JSX?",
      answer: "JavaScript XML",
      correctAnswer: "JavaScript XML",
      isCorrect: true,
      explanation: "JSX is a syntax extension for JavaScript, allowing HTML-like code inside JavaScript.",
    },
    {
      question: "What is a state in React?",
      answer: "An object used to store data that can change over time.",
      correctAnswer: "A component’s state holds data that influences the output of a render.",
      isCorrect: false,
      explanation: "State is used to store data that can change, but the correct answer is: 'A component’s state holds data that influences the output of a render.'",
    },
    {
      question: "What is the purpose of React Router?",
      answer: "To manage HTTP requests in React.",
      correctAnswer: "To manage navigation and rendering of components in a React application.",
      isCorrect: false,
      explanation: "React Router is used to manage routing and navigation between different components in a React app.",
    },
    {
      question: "What is Redux?",
      answer: "A tool to style components.",
      correctAnswer: "A state management tool for JavaScript applications.",
      isCorrect: false,
      explanation: "Redux is a predictable state container for JavaScript apps, often used with React.",
    },
    {
      question: "What is a React component?",
      answer: "A function that returns UI elements.",
      correctAnswer: "A JavaScript function or class that optionally accepts inputs (called 'props') and returns a React element that describes how a UI should appear.",
      isCorrect: false,
      explanation: "Components are the building blocks of React applications and can be either function or class-based.",
    },
    {
      question: "What is the useState hook?",
      answer: "Used to store static data in React.",
      correctAnswer: "A hook that allows you to add state to functional components in React.",
      isCorrect: false,
      explanation: "The `useState` hook is used to manage state within functional components in React.",
    },
    {
      question: "What is the purpose of the key prop in React?",
      answer: "To uniquely identify elements for faster rendering.",
      correctAnswer: "To uniquely identify elements in a list for efficient DOM updates.",
      isCorrect: true,
      explanation: "The `key` prop helps React identify which items have changed, are added, or are removed, enhancing performance.",
    },
    {
      question: "What is the purpose of React's virtual DOM?",
      answer: "To improve rendering speed by using an in-memory representation of the actual DOM.",
      correctAnswer: "To improve rendering speed by using an in-memory representation of the actual DOM.",
      isCorrect: true,
      explanation: "React’s virtual DOM enables fast updates by minimizing the number of changes to the real DOM.",
    },
    {
      question: "How does React handle events?",
      answer: "By attaching event listeners to DOM elements.",
      correctAnswer: "React handles events using synthetic events, which wrap around the native browser events.",
      isCorrect: false,
      explanation: "React uses a synthetic event system to handle events in a cross-browser compatible way.",
    },
  ];


  return (
    <div className="dashboard-body">
      {/* Breadcrumb Navigation */}
      <div class="breadcrumb-bar breadcrumb-bar-info">
              <div class="container">
                <div class="row">
                  <div class="col-md-12 col-12">
                    <div class="breadcrumb-list">
                      <h2 class="breadcrumb-title">Review Quiz</h2>
                      <nav aria-label="breadcrumb" class="page-breadcrumb">
                        <ol class="breadcrumb">
                          <li class="breadcrumb-item"><Link to="/student">Home</Link></li>
                          <li class="breadcrumb-item active" aria-current="page">Review Quiz</li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>

      {/* Quiz Results */}
      <div className="card p-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">Review: {quizDetails.title}</h2>
        <p className="text-gray-700 mb-2">Date: {quizDetails.date}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <span className="text-green-700 font-semibold">Correct Answers: {quizDetails.correct}</span>
          </div>
          <div className="text-center">
            <span className="text-red-500 font-semibold">Incorrect Answers: {quizDetails.incorrect}</span>
          </div>
          <div className="text-center">
            <span className="text-gray-600 font-semibold">Total Questions: {quizDetails.totalQuestions}</span>
          </div>
        </div>
      </div>

      {/* Review Questions */}
      <div className="card p-8">
        <h3 className="text-lg font-semibold mb-6">Your Answers</h3>
        {questions.map((q, index) => (
          <div key={index} className="mb-6">
            <div className="text-md font-semibold mb-2">{q.question}</div>
            <div
              className={`p-4 rounded-md ${
                q.isCorrect ? "bg-green-100" : "bg-red-100"
              } border border-gray-300`}
            >
              <p className="mb-2 font-medium">Your Answer:</p>
              <p>{q.answer}</p>

              <div className="mt-3">
                <p className="font-medium">Explanation:</p>
                <p>{q.explanation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-between">
        <Link
          to="/student/attempted/quizzes"
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Back to Quizzes
        </Link>
        <button
          onClick={() => alert("Quiz feedback submitted")}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default ReviewQuizAnswers;
