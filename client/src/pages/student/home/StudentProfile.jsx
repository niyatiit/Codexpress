import React from 'react'

const StudentProfile = () => {
	return (
		<div className="extra_main_div p-0 flex flex-col items-center gap-30 justify-center">
			<div class="breadcrumb-bar breadcrumb-bar-info m-0 p-0">
				<div class="container flex justify-center items-center">
					<div class="row">
						<div class="col-md-12 col-12">
							<div class="breadcrumb-list">
								<h2 class="breadcrumb-title">My Profile</h2>
								<nav aria-label="breadcrumb" class="page-breadcrumb">
									<ol class="breadcrumb">
										<li class="breadcrumb-item"><a href="index.html">Home</a></li>
										<li class="breadcrumb-item active" aria-current="page">My Profile</li>
									</ol>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-xl-9 col-lg-10 w-[90%]">

				<div class="settings-widget card-details mb-0">
					<div class="settings-menu p-0">
						<div class="profile-heading">
							<h3>My Profile</h3>
						</div>
						<div class="checkout-form personal-address">
							<div class="row">
								<div class="col-sm-6">
									<div class="contact-info">
										<h6>First Name</h6>
										<p>Ronald</p>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="contact-info">
										<h6>Last Name</h6>
										<p>Richard</p>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="contact-info">
										<h6>User Name</h6>
										<p>studentdemo</p>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="contact-info">
										<h6>Email</h6>
										<p><a href="https://dreamslms.dreamstechnologies.com/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="dba8afaebfbeb5afbfbeb6b49bbea3bab6abb7bef5b8b4b6">[email&#160;protected]</a></p>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="contact-info">
										<h6>Phone Number</h6>
										<p>90154-91036</p>
									</div>
								</div>
								<div class="col-sm-12">
									<div class="contact-info mb-0">
										<h6>Bio</h6>
										<p>Hello! I'm Ronald Richard. I'm passionate about developing innovative software solutions, analyzing classic literature. I aspire to become a software developer, work as an editor. In my free time, I enjoy coding, reading, hiking etc.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StudentProfile