import React, { useState } from "react";
import Header from "../components/Header";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-0 px-4 py-2">
      <button
        className="w-full py-6 flex justify-between items-center text-md text-left focus:outline-none"
        onClick={onClick}
      >
        <span className="text-lg font-medium text-gray-900 text-md">{question}</span>
        <svg
          className={`w-26 h-26 text-gray-500 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`transform transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mb-6" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <p className="text-zinc-600 leading-relaxed text-[15px]">{answer}</p>
      </div>
    </div>
  );
};

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What programming languages do you teach?",
      answer: "We offer comprehensive courses in Python, JavaScript, Java, and other popular programming languages. Our curriculum is regularly updated to reflect industry demands and best practices."
    },
    {
      question: "Are the courses suitable for beginners?",
      answer: "Yes, our courses cater to all skill levels. We have specially designed tracks for beginners that start with programming fundamentals and gradually progress to more advanced concepts."
    },
    {
      question: "How long does it take to complete a course?",
      answer: "Course duration varies depending on the complexity and depth of the subject matter. Most courses can be completed in 8-12 weeks when studying 5-10 hours per week. However, you can learn at your own pace."
    },
    {
      question: "Do you provide certification upon completion?",
      answer: "Yes, upon successful completion of a course, you'll receive a verified digital certificate that you can share on your professional networks and with potential employers."
    },
    {
      question: "What kind of support is available?",
      answer: "We provide comprehensive support including 24/7 technical assistance, dedicated mentors, active community forums, and regular live Q&A sessions with instructors."
    },
    {
      question: "Can I access the course content after completion?",
      answer: "Yes, once enrolled, you have lifetime access to the course materials, including any future updates to the curriculum."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied with the course, you can request a full refund within the first 30 days of enrollment."
    }
  ];

  const categories = {
    "Getting Started": [0, 1],
    "Course Information": [2, 3],
    "Support & Access": [4, 5],
    "Payment & Refunds": [6]
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-16 mt-88">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-md text-gray-600 leading-relaxed mb-[50px]">
            Find answers to common questions about our platform and courses
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="mb-12">
          {Object.entries(categories).map(([category, indices], idx) => (
            <div key={idx} className="mb-12 last:mb-0">
              <h2 className="text-2xl font-semibold text-blue-600 mt-28 mb-12">
                {category}
              </h2>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-1 text-md">
                {indices.map((index) => (
                  <FAQItem
                    key={index}
                    question={faqs[index].question}
                    answer={faqs[index].answer}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions Section */}
        <div className="text-center bg-gray-50 rounded-lg p-8 mt-5">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            We're here to help. Contact our support team for assistance.
          </p>
          <button
            onClick={() => window.location.href = "/contact"}
            className="bg-blue-600 text-white px-8 py-2 rounded-lg text-md font-medium hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </button>
        </div>
      </main>
    </div>
  );
};

export default Faqs;