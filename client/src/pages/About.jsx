import React from "react";
import Header from "../components/Header";
import logo from "../assets/logo-white.png";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
     <Header/>
      
      {/* Features Section */}
      <section className="max-w-5xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Why Choose Codexpress?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-bold">Comprehensive Tutorials</h3>
            <p className="mt-2 text-gray-600">Step-by-step guides to enhance your coding skills.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-bold">Project-Based Learning</h3>
            <p className="mt-2 text-gray-600">Hands-on projects to apply your knowledge.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-bold">Community Support</h3>
            <p className="mt-2 text-gray-600">Join our active community for help and collaboration.</p>
          </div>
        </div>
      </section>

{/* Footer */}
<footer className="footer">
          {/* Footer Top */}
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  {/* Footer Widget */}
                  <div className="footer-widget footer-about">
                    <div className="footer-logo">
                      <img src={logo} alt="logo" />
                    </div>
                    <div className="footer-about-content">
                      <p>Codexpress is your go-to platform for coding tutorials, resources, and community support. Join us to enhance your coding skills and connect with like-minded developers.</p>
                    </div>
                  </div>
                  {/* /Footer Widget */}
                </div>

                <div className="col-lg-2 col-md-6">
                  {/* Footer Widget */}
                  <div className="footer-widget footer-menu">
                    <h2 className="footer-title">Quick Links</h2>
                    <ul>
                      <li><a href="/">Home</a></li>
                      <li><a href="/about">About Us</a></li>
                      <li><a href="/courses">Courses</a></li>
                      <li><a href="/blog">Blog</a></li>
                      <li><a href="/contact">Contact</a></li>
                    </ul>
                  </div>
                  {/* /Footer Widget */}
                </div>

                <div className="col-lg-2 col-md-6">
                  {/* Footer Widget */}
                  <div className="footer-widget footer-menu">
                    <h2 className="footer-title">Resources</h2>
                    <ul>
                      <li><a href="/faq">FAQ</a></li>
                      <li><a href="/privacy-policy">Privacy Policy</a></li>
                      <li><a href="/terms">Terms of Service</a></li>
                      <li><a href="/support">Support</a></li>
                      <li><a href="/community">Community</a></li>
                    </ul>
                  </div>
                  {/* /Footer Widget */}
                </div>

                <div className="col-lg-4 col-md-6">
                  {/* Footer Widget */}
                  <div className="footer-widget footer-contact">
                    <h2 className="footer-title">Contact Us</h2>
                    <div className="footer-contact-info">
                      <div className="footer-address">
                        <img src="assets/img/icon/icon-20.svg" alt="Img" className="img-fluid" />
                        <p>3556 Beech Street, San Francisco,<br />California, CA 94108</p>
                      </div>
                      <p>
                        <img src="assets/img/icon/icon-19.svg" alt="Img" className="img-fluid" />
                        <a href="mailto:info@codexpress.com">info@codexpress.com</a>
                      </p>
                      <p className="mb-0">
                        <img src="assets/img/icon/icon-21.svg" alt="Img" className="img-fluid" />
                        +19 123-456-7890
                      </p>
                    </div>
                  </div>
                  {/* /Footer Widget */}
                </div>
              </div>
            </div>
          </div>
          {/* /Footer Top */}

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="container">
              {/* Copyright */}
              <div className="copyright">
                <div className="row">
                  <div className="col-md-6">
                    <div className="privacy-policy">
                      <ul>
                        <li><a href="/terms">Terms</a></li>
                        <li><a href="/privacy-policy">Privacy</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="copyright-text">
                      <p className="mb-0">&copy; 2024 Codexpress. All rights reserved.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Copyright */}
            </div>
          </div>
          {/* /Footer Bottom */}
        </footer>
        {/* /Footer */}
    </div>
  );
};

export default About;
