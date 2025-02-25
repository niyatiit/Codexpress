import React from "react";
import Header from "../components/Header";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen ">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-20 mt-88">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Contact Us
          </h1>
          <p className="text-md text-gray-600">
            Have questions? We're here to help.
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-8 rounded-lg shadow-xl mb-32 mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12">
            <div className="text-center">
              <div className="p-6 bg-blue-100 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Email</h2>
                <p className="text-gray-600">support@codexpress.com</p>
              </div>
            </div>
            <div className="text-center">
              <div className="p-6 bg-blue-100 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Phone</h2>
                <p className="text-gray-600">+91 (333) 123-4567</p>
              </div>
            </div>
            <div className="text-center">
              <div className="p-6 bg-blue-100 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Location</h2>
                <p className="text-gray-600">Vastral, Ahmedabad</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-28 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
                placeholder="Enter your email"

              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
                placeholder="Type here subject"

              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all"
                required
                placeholder="Type your message"

              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-48 py-3 rounded-lg text-md font-medium hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Contact;