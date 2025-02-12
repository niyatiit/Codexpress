import React from "react";
// import "./About.css"; // Include your custom CSS for styling

const About = () => {
  return (
    <section className="about-section d-flex align-items-center px-48">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <div className="about-content aos" data-aos="fade-up">
              <div className="about-text">
                <h5>Who We Are</h5>
                <h1>Building a Community of Lifelong Learners</h1>
                <p>
                  At [Your Company], we believe in empowering individuals by
                  providing access to high-quality, affordable, and accessible
                  education. Learn new skills and achieve your dreams with us.
                </p>
              </div>
              <div className="about-stats">
                <div className="row">
                  <div className="col-md-4">
                    <div className="stat-box text-center">
                      <h2>15K+</h2>
                      <p>Happy Learners</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="stat-box text-center">
                      <h2>200+</h2>
                      <p>Courses Offered</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="stat-box text-center">
                      <h2>50+</h2>
                      <p>Expert Instructors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 d-flex align-items-center">
            <div className="about-img aos" data-aos="fade-up">
              <img
                src="about-us-image.jpg"
                alt="About Us"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
