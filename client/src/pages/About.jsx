import React from "react";
import Header from "../components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-16 mt-80">
        {/* Hero Section */}
        <div className="mb-20">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            About CodeXpress
          </h1>
          <p className="text-md text-gray-600 leading-relaxed">
            We provide high-quality coding education to help you master modern technologies and advance your career.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-48">
          <h2 className="text-3xl font-semibold text-gray-900 mt-5 mb-2">
            Our Mission
          </h2>
          <p className="text-md text-gray-600 leading-relaxed ">
            Making professional coding education accessible to everyone through structured learning paths and hands-on practice.
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-gray-900 mb-16">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: "Khushi Pal",
                role: "Founder & CEO",
                image: "https://i.pinimg.com/736x/ce/e1/1a/cee11a1ad91841c70fbe067064df6f2e.jpg"
              },
              {
                name: "Niyati Patel",
                role: "Head of Education",
                image: "https://i.pinimg.com/736x/38/d5/64/38d564e91b64bc0258896e35c8df359e.jpg"
              },
              {
                name: "Jinal Patel",
                role: "Tech Director",
                image: "https://i.pinimg.com/736x/0e/bd/b9/0ebdb9f8cb628dc5224bd2f84a2ff9e2.jpg"
              }
            ].map((member, index) => (
              <div key={index} className="text-center bg-blue-100 py-4 rounded-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-44 h-48 mx-auto rounded-full mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button 
            onClick={() => window.location.href = "/courses"}
            className="bg-blue-600 text-white px-48 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Explore Courses
          </button>
        </div>
      </main>
    </div>
  );
};

export default About;