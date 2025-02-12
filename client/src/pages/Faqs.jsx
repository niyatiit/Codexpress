import React from 'react';
import Header from '../components/Header';

const Faqs = () => {
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header />
        {/* /Header */}

        {/* Breadcrumb */}
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                      <li className="breadcrumb-item">Pages</li>
                      <li className="breadcrumb-item">FAQ</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}

        {/* Page Banner */}
        <div className="page-banner">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <h1 className="mb-0">Most frequently asked questions</h1>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Banner */}

        {/* Help Details */}
        <div className="help-sec">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="help-title">
                  <h1>Most frequently asked questions</h1>
                  <p>Here are the most frequently asked questions you may check before getting started</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                {/* Faq */}
                <div className="faq-card">
                  <h6 className="faq-title">
                    <a className="collapsed" data-bs-toggle="collapse" href="#faqone" aria-expanded="false">Is there a 14-days trial?</a>
                  </h6>
                  <div id="faqone" className="collapse">
                    <div className="faq-detail">
                      <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.</p>
                      <p>If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages.</p>
                    </div>
                  </div>
                </div>

                <div className="faq-card">
                  <h6 className="faq-title">
                    <a className="collapsed" data-bs-toggle="collapse" href="#faqtwo" aria-expanded="false">How much time I will need to learn this app?</a>
                  </h6>
                  <div id="faqtwo" className="collapse">
                    <div className="faq-detail">
                      <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.</p>
                      <p>If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages.</p>
                    </div>
                  </div>
                </div>

                <div className="faq-card">
                  <h6 className="faq-title">
                    <a className="collapsed" data-bs-toggle="collapse" href="#faqthree" aria-expanded="false">Is there a month-to-month payment option?</a>
                  </h6>
                  <div id="faqthree" className="collapse">
                    <div className="faq-detail">
                      <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.</p>
                      <p>If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages.</p>
                    </div>
                  </div>
                </div>
                {/* /Faq */}
              </div>

              <div className="col-lg-6">
                {/* Faq */}
                <div className="faq-card">
                  <h6 className="faq-title">
                    <a className="collapsed" data-bs-toggle="collapse" href="#faqfour" aria-expanded="false">What’s the benefits of the Premium Membership?</a>
                  </h6>
                  <div id="faqfour" className="collapse">
                    <div className="faq-detail">
                      <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.</p>
                      <p>If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages.</p>
                    </div>
                  </div>
                </div>

                <div className="faq-card">
                  <h6 className="faq-title">
                    <a className="collapsed" data-bs-toggle="collapse" href="#faqfive" aria-expanded="false">Are there any free tutorials available?</a>
                  </h6>
                  <div id="faqfive" className="collapse">
                    <div className="faq-detail">
                      <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.</p>
                      <p>If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages.</p>
                    </div>
                  </div>
                </div>

                <div className="faq-card">
                  <h6 className="faq-title">
                    <a className="collapsed" data-bs-toggle="collapse" href="#faqsix" aria-expanded="false">How can I cancel my subscription plan?</a>
                  </h6>
                  <div id="faqsix" className="collapse">
                    <div className="faq-detail">
                      <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.</p>
                      <p>If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages.</p>
                    </div>
                  </div>
                </div>
                {/* /Faq */}
              </div>
            </div>
          </div>
        </div>
        {/* /Help Details */}

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
                      <img src="assets/img/logo.svg" alt="logo" />
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
    </>
  );
};

export default Faqs;