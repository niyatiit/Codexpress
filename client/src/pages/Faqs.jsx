import React from 'react'
import Header from '../components/Header'

const Faqs = () => {
  return (
    <>
        <div class="main-wrapper">
		
        {/* <!-- Header --> */}
        <Header/>
        {/* <!-- /Header --> */}
        
        {/* <!-- Br/eadcrumb --> */}
        <div class="br/eadcrumb-bar">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-12">
                        <div class="br/eadcrumb-list">
                            <nav aria-label="br/eadcrumb" class="page-br/eadcrumb">
                                <ol class="br/eadcrumb">
                                    <li class="br/eadcrumb-item"><a href="index.html">Home</a></li>
                                    <li class="br/eadcrumb-item">Pages</li>
                                    <li class="br/eadcrumb-item" >FAQ</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- /Br/eadcrumb --> */}
        
        {/* <!-- Br/eadcrumb --> */}
        <div class="page-banner">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-12">
                        <h1 class="mb-0">Most frequently asked questions</h1>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- /Br/eadcrumb --> */}
        
        {/* <!-- Help Details --> */}
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

        {/* <!-- /Help Details --> */}
        
        {/* <!-- Footer --> */}
        <footer class="footer">
            
            {/* <!-- Footer Top --> */}
            <div class="footer-top">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-md-6">
                        
                            {/* <!-- Footer Widget --> */}
                            <div class="footer-widget footer-about">
                                <div class="footer-logo">
                                    <img src="assets/img/logo.svg" alt="logo"/>
                                </div>
                                <div class="footer-about-content">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat mauris Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat mauris</p>
                                </div>
                            </div>
                            {/* <!-- /Footer Widget --> */}
                            
                        </div>
                        
                        <div class="col-lg-2 col-md-6">
                        
                            {/* <!-- Footer Widget --> */}
                            <div class="footer-widget footer-menu">
                                <h2 class="footer-title">For Instructor</h2>
                                <ul>
                                    <li><a href="instructor-profile.html">Profile</a></li>
                                    <li><a href="login.html">Login</a></li>
                                    <li><a href="register.html">Register</a></li>
                                    <li><a href="instructor-list.html">Instructor</a></li>
                                    <li><a href="instructor-dashboard.html"> Dashboard</a></li>
                                </ul>
                            </div>
                            {/* <!-- /Footer Widget --> */}
                            
                        </div>
                        
                        <div class="col-lg-2 col-md-6">
                        
                            {/* <!-- Footer Widget --> */}
                            <div class="footer-widget footer-menu">
                                <h2 class="footer-title">For Student</h2>
                                <ul>
                                    <li><a href="student-profile.html">Profile</a></li>
                                    <li><a href="login.html">Login</a></li>
                                    <li><a href="register.html">Register</a></li>
                                    <li><a href="students-list.html">Student</a></li>
                                    <li><a href="student-dashboard.html"> Dashboard</a></li>
                                </ul>
                            </div>
                            {/* <!-- /Footer Widget --> */}
                            
                        </div>
                        
                        <div class="col-lg-4 col-md-6">
                        
                            {/* <!-- Footer Widget --> */}
                            <div class="footer-widget footer-contact">
                                <h2 class="footer-title">News letter</h2>
                                <div class="news-letter">
                                    <form>
                                        <input type="text" class="form-control" placeholder="Enter your email address" name="email"/>
                                    </form>
                                </div>
                                <div class="footer-contact-info">
                                    <div class="footer-address">
                                        <img src="assets/img/icon/icon-20.svg" alt="Img" class="img-fluid"/>
                                        <p> 3556  Beech Street, San Francisco,<br/> California, CA 94108 </p>
                                    </div>
                                    <p>
                                        <img src="assets/img/icon/icon-19.svg" alt="Img" class="img-fluid"/>
                                        <a href="https://dreamslms.dreamstechnologies.com/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="4c283e292d213f20213f0c29342d213c2029622f2321">[email&#160;protected]</a>
                                    </p>
                                    <p class="mb-0">
                                        <img src="assets/img/icon/icon-21.svg" alt="Img" class="img-fluid"/>
                                        +19 123-456-7890
                                    </p>
                                </div>
                            </div>
                            {/* <!-- /Footer Widget --> */}
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            {/* <!-- /Footer Top --> */}
            
            {/* <!-- Footer Bottom --> */}
            <div class="footer-bottom">
                <div class="container">
                
                    {/* <!-- Copyright --> */}
                    <div class="copyright">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="privacy-policy">
                                    <ul>
                                        <li><a href="term-condition.html">Terms</a></li>
                                        <li><a href="privacy-policy.html">Privacy</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="copyright-text">
                                    <p class="mb-0">&copy; 2024 DreamsLMS. All rights reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /Copyright --> */}
                    
                </div>
            </div>
            {/* <!-- /Footer Bottom --> */}
            
        </footer>
        {/* <!-- /Footer --> */}
       
    </div>
    </>
  )
}

export default Faqs