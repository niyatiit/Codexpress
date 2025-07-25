import React from 'react'

const MyCourses = () => {
    return (
        <div class="dashboard-body">
            {/* <!-- Breadcrumb Start --> */}
            <div class="breadcrumb mb-24">
                <ul class="flex-align gap-4">
                    <li><a href="index.html" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
                    <li> <span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span> </li>
                    <li><span class="text-main-600 fw-normal text-15">Student Courses</span></li>
                </ul>
            </div>
            {/* <!-- Breadcrumb End --> */}

            {/* <!-- Course Tab Start --> */}
            <div class="card">
                <div class="card-body">
                    <div class="mb-24">
                        <ul class="nav nav-pills common-tab gap-20" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="pills-onGoing-tab" data-bs-toggle="pill" data-bs-target="#pills-onGoing" type="button" role="tab" aria-controls="pills-onGoing" aria-selected="true">Ongoing (08)</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-completed-tab" data-bs-toggle="pill" data-bs-target="#pills-completed" type="button" role="tab" aria-controls="pills-completed" aria-selected="false">Completed (10)</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-saved-tab" data-bs-toggle="pill" data-bs-target="#pills-saved" type="button" role="tab" aria-controls="pills-saved" aria-selected="false">Saved (12)</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-favourite-tab" data-bs-toggle="pill" data-bs-target="#pills-favourite" type="button" role="tab" aria-controls="pills-favourite" aria-selected="false">Favorite (25)</button>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-onGoing" role="tabpanel" aria-labelledby="pills-onGoing-tab" tabindex="0">
                            <div class="row g-20">
                                <div class="col-xxl-3 col-lg-4 col-sm-6">
                                    <div class="card border border-gray-100">
                                        <div class="card-body p-8">
                                            <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                <img src="assets/images/thumbs/course-img1.png" alt="Course Image" />
                                            </a>
                                            <div class="p-8">
                                                <span class="text-13 py-2 px-10 rounded-pill bg-success-50 text-success-600 mb-16">Development</span>
                                                <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">Full Stack Web Development</a></h5>

                                                <div class="flex-align gap-8 mt-12">
                                                    <span class="text-main-600 flex-shrink-0 text-13 fw-medium">32%</span>
                                                    <div class="progress w-100  bg-main-100 rounded-pill h-8" role="progressbar" aria-label="Basic example" aria-valuenow="32" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar bg-main-600 rounded-pill" style={{ width: '32%' }}></div>
                                                    </div>
                                                </div>
                                                <div class="flex-align gap-8 flex-wrap mt-16">
                                                    <img src="assets/images/thumbs/user-img1.png" class="w-32 h-32 rounded-circle object-fit-cover" alt="User Image" />
                                                    <div>
                                                        <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="live-class.html" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Continue Watching</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-lg-4 col-sm-6">
                                    <div class="card border border-gray-100">
                                        <div class="card-body p-8">
                                            <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                <img src="assets/images/thumbs/course-img2.png" alt="Course Image" />
                                            </a>
                                            <div class="p-8">
                                                <span class="text-13 py-2 px-10 rounded-pill bg-warning-50 text-warning-600 mb-16">Design</span>
                                                <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">UI/UX Design Course</a></h5>

                                                <div class="flex-align gap-8 mt-12">
                                                    <span class="text-main-600 flex-shrink-0 text-13 fw-medium">20%</span>
                                                    <div class="progress w-100  bg-main-100 rounded-pill h-8" role="progressbar" aria-label="Basic example" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar bg-main-600 rounded-pill" style={{ width: '20%' }}></div>
                                                    </div>
                                                </div>
                                                <div class="flex-align gap-8 flex-wrap mt-16">
                                                    <img src="assets/images/thumbs/user-img2.png" class="w-32 h-32 rounded-circle object-fit-cover" alt="User Image" />
                                                    <div>
                                                        <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="live-class.html" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Continue Watching</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-lg-4 col-sm-6">
                                    <div class="card border border-gray-100">
                                        <div class="card-body p-8">
                                            <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                <img src="assets/images/thumbs/course-img3.png" alt="Course Image" />
                                            </a>
                                            <div class="p-8">
                                                <span class="text-13 py-2 px-10 rounded-pill bg-danger-50 text-danger-600 mb-16">Frontend</span>
                                                <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">React Native Courese</a></h5>

                                                <div class="flex-align gap-8 mt-12">
                                                    <span class="text-main-600 flex-shrink-0 text-13 fw-medium">45%</span>
                                                    <div class="progress w-100  bg-main-100 rounded-pill h-8" role="progressbar" aria-label="Basic example" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar bg-main-600 rounded-pill" style={{ width: '45%' }}></div>
                                                    </div>
                                                </div>
                                                <div class="flex-align gap-8 flex-wrap mt-16">
                                                    <img src="assets/images/thumbs/user-img3.png" class="w-32 h-32 rounded-circle object-fit-cover" alt="User Image" />
                                                    <div>
                                                        <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="live-class.html" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Continue Watching</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-lg-4 col-sm-6">
                                    <div class="card border border-gray-100">
                                        <div class="card-body p-8">
                                            <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                <img src="assets/images/thumbs/course-img4.png" alt="Course Image" />
                                            </a>
                                            <div class="p-8">
                                                <span class="text-13 py-2 px-10 rounded-pill bg-info-50 text-info-600 mb-16">Marketing</span>
                                                <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">SEO Expert A To Z Course</a></h5>

                                                <div class="flex-align gap-8 mt-12">
                                                    <span class="text-main-600 flex-shrink-0 text-13 fw-medium">10%</span>
                                                    <div class="progress w-100  bg-main-100 rounded-pill h-8" role="progressbar" aria-label="Basic example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar bg-main-600 rounded-pill" style={{ width: '10%' }}></div>
                                                    </div>
                                                </div>
                                                <div class="flex-align gap-8 flex-wrap mt-16">
                                                    <img src="assets/images/thumbs/user-img4.png" class="w-32 h-32 rounded-circle object-fit-cover" alt="User Image" />
                                                    <div>
                                                        <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="live-class.html" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Continue Watching</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-completed" role="tabpanel" aria-labelledby="pills-completed-tab" tabindex="0">
                            <div class="row g-20">
                                <div class="col-xxl-3 col-lg-4 col-sm-6">
                                    <div class="card border border-gray-100">
                                        <div class="card-body p-8">
                                            <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                <img src="assets/images/thumbs/course-img1.png" alt="Course Image" />
                                            </a>
                                            <div class="p-8">
                                                <span class="text-13 py-2 px-10 rounded-pill bg-success-50 text-success-600 mb-16">Development</span>
                                                <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">Full Stack Web Development</a></h5>

                                                <div class="flex-align gap-8 mt-12">
                                                    <span class="text-main-600 flex-shrink-0 text-13 fw-medium">32%</span>
                                                    <div class="progress w-100  bg-main-100 rounded-pill h-8" role="progressbar" aria-label="Basic example" aria-valuenow="32" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar bg-main-600 rounded-pill" style={{ width: '32%' }}></div>
                                                    </div>
                                                </div>
                                                <div class="flex-align gap-8 flex-wrap mt-16">
                                                    <img src="assets/images/thumbs/user-img1.png" class="w-32 h-32 rounded-circle object-fit-cover" alt="User Image" />
                                                    <div>
                                                        <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="live-class.html" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Continue Watching</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-lg-4 col-sm-6">
                                    <div class="card border border-gray-100">
                                        <div class="card-body p-8">
                                            <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                <img src="assets/images/thumbs/course-img2.png" alt="Course Image" />
                                            </a>
                                            <div class="p-8">
                                                <span class="text-13 py-2 px-10 rounded-pill bg-warning-50 text-warning-600 mb-16">Design</span>
                                                <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">UI/UX Design Course</a></h5>

                                                <div class="flex-align gap-8 mt-12">
                                                    <span class="text-main-600 flex-shrink-0 text-13 fw-medium">20%</span>
                                                    <div class="progress w-100  bg-main-100 rounded-pill h-8" role="progressbar" aria-label="Basic example" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar bg-main-600 rounded-pill" style={{ width: '20%' }}></div>
                                                    </div>
                                                </div>
                                                <div class="flex-align gap-8 flex-wrap mt-16">
                                                    <img src="assets/images/thumbs/user-img2.png" class="w-32 h-32 rounded-circle object-fit-cover" alt="User Image" />
                                                    <div>
                                                        <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="live-class.html" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Continue Watching</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-lg-4 col-sm-6">
                                    <div class="card border border-gray-100">
                                        <div class="card-body p-8">
                                            <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                <img src="assets/images/thumbs/course-img3.png" alt="Course Image" />
                                            </a>
                                            <div class="p-8">
                                                <span class="text-13 py-2 px-10 rounded-pill bg-danger-50 text-danger-600 mb-16">Frontend</span>
                                                <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">React Native Courese</a></h5>

                                                <div class="flex-align gap-8 mt-12">
                                                    <span class="text-main-600 flex-shrink-0 text-13 fw-medium">45%</span>
                                                    <div class="progress w-100  bg-main-100 rounded-pill h-8" role="progressbar" aria-label="Basic example" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar bg-main-600 rounded-pill" style={{ width: '45%' }}></div>
                                                    </div>
                                                </div>
                                                <div class="flex-align gap-8 flex-wrap mt-16">
                                                    <img src="assets/images/thumbs/user-img3.png" class="w-32 h-32 rounded-circle object-fit-cover" alt="User Image" />
                                                    <div>
                                                        <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="live-class.html" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Continue Watching</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-lg-4 col-sm-6">
                                    <div class="card border border-gray-100">
                                        <div class="card-body p-8">
                                            <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                <img src="assets/images/thumbs/course-img4.png" alt="Course Image" />
                                            </a>
                                            <div class="p-8">
                                                <span class="text-13 py-2 px-10 rounded-pill bg-info-50 text-info-600 mb-16">Marketing</span>
                                                <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">SEO Expert A To Z Course</a></h5>

                                                <div class="flex-align gap-8 mt-12">
                                                    <span class="text-main-600 flex-shrink-0 text-13 fw-medium">10%</span>
                                                    <div class="progress w-100  bg-main-100 rounded-pill h-8" role="progressbar" aria-label="Basic example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar bg-main-600 rounded-pill" style={{ width: '10%' }}></div>
                                                    </div>
                                                </div>
                                                <div class="flex-align gap-8 flex-wrap mt-16">
                                                    <img src="assets/images/thumbs/user-img4.png" class="w-32 h-32 rounded-circle object-fit-cover" alt="User Image" />
                                                    <div>
                                                        <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="live-class.html" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Continue Watching</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-saved" role="tabpanel" aria-labelledby="pills-saved-tab" tabindex="0">
                            <div class="row g-20">
                                <div class="col-xxl-3 col-lg-4 col-sm-6">
                                    <div class="card border border-gray-100">
                                        <div class="card-body p-8">
                                            <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                <img src="assets/images/thumbs/course-img1.png" alt="Course Image" />
                                            </a>
                                            <div class="p-8">
                                                <span class="text-13 py-2 px-10 rounded-pill bg-success-50 text-success-600 mb-16">Development</span>
                                                <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">Full Stack Web Development</a></h5>

                                                <div class="flex-align gap-8 mt-12">
                                                    <span class="text-main-600 flex-shrink-0 text-13 fw-medium">32%</span>
                                                    <div class="progress w-100  bg-main-100 rounded-pill h-8" role="progressbar" aria-label="Basic example" aria-valuenow="32" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar bg-main-600 rounded-pill" style={{ width: '32%' }}></div>
                                                    </div>
                                                </div>
                                                <div class="flex-align gap-8 flex-wrap mt-16">
                                                    <img src="assets/images/thumbs/user-img1.png" class="w-32 h-32 rounded-circle object-fit-cover" alt="User Image" />
                                                    <div>
                                                        <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="live-class.html" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Continue Watching</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-lg-4 col-sm-6">
                                    <div class="card border border-gray-100">
                                        <div class="card-body p-8">
                                            <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                <img src="assets/images/thumbs/course-img2.png" alt="Course Image" />
                                            </a>
                                            <div class="p-8">
                                                <span class="text-13 py-2 px-10 rounded-pill bg-warning-50 text-warning-600 mb-16">Design</span>
                                                <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">UI/UX Design Course</a></h5>

                                                <div class="flex-align gap-8 mt-12">
                                                    <span class="text-main-600 flex-shrink-0 text-13 fw-medium">20%</span>
                                                    <div class="progress w-100  bg-main-100 rounded-pill h-8" role="progressbar" aria-label="Basic example" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar bg-main-600 rounded-pill" style={{ width: '20%' }}></div>
                                                    </div>
                                                </div>
                                                <div class="flex-align gap-8 flex-wrap mt-16">
                                                    <img src="assets/images/thumbs/user-img2.png" class="w-32 h-32 rounded-circle object-fit-cover" alt="User Image" />
                                                    <div>
                                                        <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="live-class.html" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Continue Watching</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-lg-4 col-sm-6">
                                    <div class="card border border-gray-100">
                                        <div class="card-body p-8">
                                            <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                <img src="assets/images/thumbs/course-img3.png" alt="Course Image" />
                                            </a>
                                            <div class="p-8">
                                                <span class="text-13 py-2 px-10 rounded-pill bg-danger-50 text-danger-600 mb-16">Frontend</span>
                                                <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">React Native Courese</a></h5>

                                                <div class="flex-align gap-8 mt-12">
                                                    <span class="text-main-600 flex-shrink-0 text-13 fw-medium">45%</span>
                                                    <div class="progress w-100  bg-main-100 rounded-pill h-8" role="progressbar" aria-label="Basic example" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar bg-main-600 rounded-pill" style={{ width: '45%' }}></div>
                                                    </div>
                                                </div>
                                                <div class="flex-align gap-8 flex-wrap mt-16">
                                                    <img src="assets/images/thumbs/user-img3.png" class="w-32 h-32 rounded-circle object-fit-cover" alt="User Image" />
                                                    <div>
                                                        <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="live-class.html" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Continue Watching</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-lg-4 col-sm-6">
                                    <div class="card border border-gray-100">
                                        <div class="card-body p-8">
                                            <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                <img src="assets/images/thumbs/course-img4.png" alt="Course Image" />
                                            </a>
                                            <div class="p-8">
                                                <span class="text-13 py-2 px-10 rounded-pill bg-info-50 text-info-600 mb-16">Marketing</span>
                                                <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">SEO Expert A To Z Course</a></h5>

                                                <div class="flex-align gap-8 mt-12">
                                                    <span class="text-main-600 flex-shrink-0 text-13 fw-medium">10%</span>
                                                    <div class="progress w-100  bg-main-100 rounded-pill h-8" role="progressbar" aria-label="Basic example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar bg-main-600 rounded-pill" style={{ width: '10%' }}></div>
                                                    </div>
                                                </div>
                                                <div class="flex-align gap-8 flex-wrap mt-16">
                                                    <img src="assets/images/thumbs/user-img4.png" class="w-32 h-32 rounded-circle object-fit-cover" alt="User Image" />
                                                    <div>
                                                        <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="live-class.html" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Continue Watching</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-favourite" role="tabpanel" aria-labelledby="pills-favourite-tab" tabindex="0">
                            <div class="row g-20">
                                <div class="col-xxl-3 col-lg-4 col-sm-6">
                                    <div class="card border border-gray-100">
                                        <div class="card-body p-8">
                                            <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                <img src="assets/images/thumbs/course-img1.png" alt="Course Image" />
                                            </a>
                                            <div class="p-8">
                                                <span class="text-13 py-2 px-10 rounded-pill bg-success-50 text-success-600 mb-16">Development</span>
                                                <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">Full Stack Web Development</a></h5>

                                                <div class="flex-align gap-8 mt-12">
                                                    <span class="text-main-600 flex-shrink-0 text-13 fw-medium">32%</span>
                                                    <div class="progress w-100  bg-main-100 rounded-pill h-8" role="progressbar" aria-label="Basic example" aria-valuenow="32" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar bg-main-600 rounded-pill" style={{ width: '32%' }}></div>
                                                    </div>
                                                </div>
                                                <div class="flex-align gap-8 flex-wrap mt-16">
                                                    <img src="assets/images/thumbs/user-img1.png" class="w-32 h-32 rounded-circle object-fit-cover" alt="User Image" />
                                                    <div>
                                                        <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="live-class.html" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Continue Watching</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-lg-4 col-sm-6">
                                    <div class="card border border-gray-100">
                                        <div class="card-body p-8">
                                            <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                <img src="assets/images/thumbs/course-img2.png" alt="Course Image" />
                                            </a>
                                            <div class="p-8">
                                                <span class="text-13 py-2 px-10 rounded-pill bg-warning-50 text-warning-600 mb-16">Design</span>
                                                <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">UI/UX Design Course</a></h5>

                                                <div class="flex-align gap-8 mt-12">
                                                    <span class="text-main-600 flex-shrink-0 text-13 fw-medium">20%</span>
                                                    <div class="progress w-100  bg-main-100 rounded-pill h-8" role="progressbar" aria-label="Basic example" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar bg-main-600 rounded-pill" style={{ width: '20%' }}></div>
                                                    </div>
                                                </div>
                                                <div class="flex-align gap-8 flex-wrap mt-16">
                                                    <img src="assets/images/thumbs/user-img2.png" class="w-32 h-32 rounded-circle object-fit-cover" alt="User Image" />
                                                    <div>
                                                        <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="live-class.html" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Continue Watching</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-lg-4 col-sm-6">
                                    <div class="card border border-gray-100">
                                        <div class="card-body p-8">
                                            <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                <img src="assets/images/thumbs/course-img3.png" alt="Course Image" />
                                            </a>
                                            <div class="p-8">
                                                <span class="text-13 py-2 px-10 rounded-pill bg-danger-50 text-danger-600 mb-16">Frontend</span>
                                                <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">React Native Courese</a></h5>

                                                <div class="flex-align gap-8 mt-12">
                                                    <span class="text-main-600 flex-shrink-0 text-13 fw-medium">45%</span>
                                                    <div class="progress w-100  bg-main-100 rounded-pill h-8" role="progressbar" aria-label="Basic example" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar bg-main-600 rounded-pill" style={{ width: '45%' }}></div>
                                                    </div>
                                                </div>
                                                <div class="flex-align gap-8 flex-wrap mt-16">
                                                    <img src="assets/images/thumbs/user-img3.png" class="w-32 h-32 rounded-circle object-fit-cover" alt="User Image" />
                                                    <div>
                                                        <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="live-class.html" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Continue Watching</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-lg-4 col-sm-6">
                                    <div class="card border border-gray-100">
                                        <div class="card-body p-8">
                                            <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                <img src="assets/images/thumbs/course-img4.png" alt="Course Image" />
                                            </a>
                                            <div class="p-8">
                                                <span class="text-13 py-2 px-10 rounded-pill bg-info-50 text-info-600 mb-16">Marketing</span>
                                                <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">SEO Expert A To Z Course</a></h5>

                                                <div class="flex-align gap-8 mt-12">
                                                    <span class="text-main-600 flex-shrink-0 text-13 fw-medium">10%</span>
                                                    <div class="progress w-100  bg-main-100 rounded-pill h-8" role="progressbar" aria-label="Basic example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                                                        <div class="progress-bar bg-main-600 rounded-pill" style={{ width: '10%' }}></div>
                                                    </div>
                                                </div>
                                                <div class="flex-align gap-8 flex-wrap mt-16">
                                                    <img src="assets/images/thumbs/user-img4.png" class="w-32 h-32 rounded-circle object-fit-cover" alt="User Image" />
                                                    <div>
                                                        <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a href="live-class.html" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Continue Watching</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Course Tab End --> */}

            {/* <!-- Recommended Course Start --> */}
            <div class="card mt-24">
                <div class="card-body">
                    <div class="mb-20 flex-between flex-wrap gap-8">
                        <h4 class="mb-0">Recommended For You</h4>
                        <div class="flex-align gap-8 flex-wrap">
                            <div class="flex-align text-gray-500 text-13 border border-gray-100 rounded-4 ps-8 focus-border-main-600">
                                <span class="text-lg"><i class="ph ph-layout"></i></span>
                                <select class="form-control px-8 py-12 border-0 text-inherit rounded-4 text-center">
                                    <option value="1" selected disabled>Category</option>
                                    <option value="1">Web</option>
                                    <option value="1">Design</option>
                                    <option value="1">App</option>
                                    <option value="1">SEO</option>
                                </select>
                            </div>
                            <div class="position-relative text-gray-500 flex-align gap-4 text-13">
                                <span class="text-inherit">Sort by: </span>
                                <div class="flex-align text-gray-500 text-13 border border-gray-100 rounded-4 ps-8 focus-border-main-600">
                                    <span class="text-lg"><i class="ph ph-funnel-simple"></i></span>
                                    <select class="form-control px-8 py-12 border-0 text-inherit rounded-4 text-center">
                                        <option value="1" selected>Popular</option>
                                        <option value="1">Latest</option>
                                        <option value="1">Trending</option>
                                        <option value="1">Matches</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row g-20">
                        <div class="col-xxl-3 col-lg-4 col-sm-6">
                            <div class="card border border-gray-100">
                                <div class="card-body p-8">
                                    <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                        <img src="assets/images/thumbs/course-img1.png" alt="Course Image" />
                                    </a>
                                    <div class="p-8">
                                        <span class="text-13 py-2 px-10 rounded-pill bg-success-50 text-success-600 mb-16">Development</span>
                                        <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">Full Stack Web Development</a></h5>

                                        <div class="flex-align gap-8 flex-wrap mt-16">
                                            <img src="assets/images/thumbs/user-img1.png" class="w-28 h-28 rounded-circle object-fit-cover" alt="User Image" />
                                            <div>
                                                <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                            </div>
                                        </div>

                                        <div class="flex-align gap-8 mt-12 pt-12 border-top border-gray-100">
                                            <div class="flex-align gap-4">
                                                <span class="text-sm text-main-600 d-flex"><i class="ph ph-video-camera"></i></span>
                                                <span class="text-13 text-gray-600">24 Lesson</span>
                                            </div>
                                            <div class="flex-align gap-4">
                                                <span class="text-sm text-main-600 d-flex"><i class="ph ph-clock"></i></span>
                                                <span class="text-13 text-gray-600">40 Hours</span>
                                            </div>
                                        </div>

                                        <div class="flex-between gap-4 flex-wrap mt-24">
                                            <div class="flex-align gap-4">
                                                <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                            </div>
                                            <a href="course-details.html" class="btn btn-outline-main rounded-pill py-9">View Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-3 col-lg-4 col-sm-6">
                            <div class="card border border-gray-100">
                                <div class="card-body p-8">
                                    <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                        <img src="assets/images/thumbs/course-img5.png" alt="Course Image" />
                                    </a>
                                    <div class="p-8">
                                        <span class="text-13 py-2 px-10 rounded-pill bg-warning-50 text-warning-600 mb-16">Design</span>
                                        <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">Design System</a></h5>

                                        <div class="flex-align gap-8 flex-wrap mt-16">
                                            <img src="assets/images/thumbs/user-img5.png" class="w-28 h-28 rounded-circle object-fit-cover" alt="User Image" />
                                            <div>
                                                <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                            </div>
                                        </div>

                                        <div class="flex-align gap-8 mt-12 pt-12 border-top border-gray-100">
                                            <div class="flex-align gap-4">
                                                <span class="text-sm text-main-600 d-flex"><i class="ph ph-video-camera"></i></span>
                                                <span class="text-13 text-gray-600">24 Lesson</span>
                                            </div>
                                            <div class="flex-align gap-4">
                                                <span class="text-sm text-main-600 d-flex"><i class="ph ph-clock"></i></span>
                                                <span class="text-13 text-gray-600">40 Hours</span>
                                            </div>
                                        </div>

                                        <div class="flex-between gap-4 flex-wrap mt-24">
                                            <div class="flex-align gap-4">
                                                <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                            </div>
                                            <a href="course-details.html" class="btn btn-outline-main rounded-pill py-9">View Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-3 col-lg-4 col-sm-6">
                            <div class="card border border-gray-100">
                                <div class="card-body p-8">
                                    <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                        <img src="assets/images/thumbs/course-img6.png" alt="Course Image" />
                                    </a>
                                    <div class="p-8">
                                        <span class="text-13 py-2 px-10 rounded-pill bg-danger-50 text-danger-600 mb-16">Frontend</span>
                                        <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">React Native Courese</a></h5>

                                        <div class="flex-align gap-8 flex-wrap mt-16">
                                            <img src="assets/images/thumbs/user-img6.png" class="w-28 h-28 rounded-circle object-fit-cover" alt="User Image" />
                                            <div>
                                                <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                            </div>
                                        </div>

                                        <div class="flex-align gap-8 mt-12 pt-12 border-top border-gray-100">
                                            <div class="flex-align gap-4">
                                                <span class="text-sm text-main-600 d-flex"><i class="ph ph-video-camera"></i></span>
                                                <span class="text-13 text-gray-600">24 Lesson</span>
                                            </div>
                                            <div class="flex-align gap-4">
                                                <span class="text-sm text-main-600 d-flex"><i class="ph ph-clock"></i></span>
                                                <span class="text-13 text-gray-600">40 Hours</span>
                                            </div>
                                        </div>

                                        <div class="flex-between gap-4 flex-wrap mt-24">
                                            <div class="flex-align gap-4">
                                                <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                            </div>
                                            <a href="course-details.html" class="btn btn-outline-main rounded-pill py-9">View Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-3 col-lg-4 col-sm-6">
                            <div class="card border border-gray-100">
                                <div class="card-body p-8">
                                    <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                        <img src="assets/images/thumbs/course-img4.png" alt="Course Image" />
                                    </a>
                                    <div class="p-8">
                                        <span class="text-13 py-2 px-10 rounded-pill bg-info-50 text-info-600 mb-16">SEO</span>
                                        <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">Search Engine Optimization</a></h5>

                                        <div class="flex-align gap-8 flex-wrap mt-16">
                                            <img src="assets/images/thumbs/user-img4.png" class="w-28 h-28 rounded-circle object-fit-cover" alt="User Image" />
                                            <div>
                                                <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                            </div>
                                        </div>

                                        <div class="flex-align gap-8 mt-12 pt-12 border-top border-gray-100">
                                            <div class="flex-align gap-4">
                                                <span class="text-sm text-main-600 d-flex"><i class="ph ph-video-camera"></i></span>
                                                <span class="text-13 text-gray-600">24 Lesson</span>
                                            </div>
                                            <div class="flex-align gap-4">
                                                <span class="text-sm text-main-600 d-flex"><i class="ph ph-clock"></i></span>
                                                <span class="text-13 text-gray-600">40 Hours</span>
                                            </div>
                                        </div>

                                        <div class="flex-between gap-4 flex-wrap mt-24">
                                            <div class="flex-align gap-4">
                                                <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                            </div>
                                            <a href="course-details.html" class="btn btn-outline-main rounded-pill py-9">View Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-3 col-lg-4 col-sm-6">
                            <div class="card border border-gray-100">
                                <div class="card-body p-8">
                                    <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                        <img src="assets/images/thumbs/course-img3.png" alt="Course Image" />
                                    </a>
                                    <div class="p-8">
                                        <span class="text-13 py-2 px-10 rounded-pill bg-info-50 text-info-600 mb-16">Development</span>
                                        <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">React Js</a></h5>

                                        <div class="flex-align gap-8 flex-wrap mt-16">
                                            <img src="assets/images/thumbs/user-img3.png" class="w-28 h-28 rounded-circle object-fit-cover" alt="User Image" />
                                            <div>
                                                <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                            </div>
                                        </div>

                                        <div class="flex-align gap-8 mt-12 pt-12 border-top border-gray-100">
                                            <div class="flex-align gap-4">
                                                <span class="text-sm text-main-600 d-flex"><i class="ph ph-video-camera"></i></span>
                                                <span class="text-13 text-gray-600">24 Lesson</span>
                                            </div>
                                            <div class="flex-align gap-4">
                                                <span class="text-sm text-main-600 d-flex"><i class="ph ph-clock"></i></span>
                                                <span class="text-13 text-gray-600">40 Hours</span>
                                            </div>
                                        </div>

                                        <div class="flex-between gap-4 flex-wrap mt-24">
                                            <div class="flex-align gap-4">
                                                <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                            </div>
                                            <a href="course-details.html" class="btn btn-outline-main rounded-pill py-9">View Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-3 col-lg-4 col-sm-6">
                            <div class="card border border-gray-100">
                                <div class="card-body p-8">
                                    <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                        <img src="assets/images/thumbs/course-img7.png" alt="Course Image" />
                                    </a>
                                    <div class="p-8">
                                        <span class="text-13 py-2 px-10 rounded-pill bg-warning-50 text-warning-600 mb-16">Codning</span>
                                        <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">WordPress Development</a></h5>

                                        <div class="flex-align gap-8 flex-wrap mt-16">
                                            <img src="assets/images/thumbs/user-img7.png" class="w-28 h-28 rounded-circle object-fit-cover" alt="User Image" />
                                            <div>
                                                <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                            </div>
                                        </div>

                                        <div class="flex-align gap-8 mt-12 pt-12 border-top border-gray-100">
                                            <div class="flex-align gap-4">
                                                <span class="text-sm text-main-600 d-flex"><i class="ph ph-video-camera"></i></span>
                                                <span class="text-13 text-gray-600">24 Lesson</span>
                                            </div>
                                            <div class="flex-align gap-4">
                                                <span class="text-sm text-main-600 d-flex"><i class="ph ph-clock"></i></span>
                                                <span class="text-13 text-gray-600">40 Hours</span>
                                            </div>
                                        </div>

                                        <div class="flex-between gap-4 flex-wrap mt-24">
                                            <div class="flex-align gap-4">
                                                <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                            </div>
                                            <a href="course-details.html" class="btn btn-outline-main rounded-pill py-9">View Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-3 col-lg-4 col-sm-6">
                            <div class="card border border-gray-100">
                                <div class="card-body p-8">
                                    <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                        <img src="assets/images/thumbs/course-img8.png" alt="Course Image" />
                                    </a>
                                    <div class="p-8">
                                        <span class="text-13 py-2 px-10 rounded-pill bg-success-50 text-success-600 mb-16">Writing</span>
                                        <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">Content Writing</a></h5>

                                        <div class="flex-align gap-8 flex-wrap mt-16">
                                            <img src="assets/images/thumbs/user-img8.png" class="w-28 h-28 rounded-circle object-fit-cover" alt="User Image" />
                                            <div>
                                                <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                            </div>
                                        </div>

                                        <div class="flex-align gap-8 mt-12 pt-12 border-top border-gray-100">
                                            <div class="flex-align gap-4">
                                                <span class="text-sm text-main-600 d-flex"><i class="ph ph-video-camera"></i></span>
                                                <span class="text-13 text-gray-600">24 Lesson</span>
                                            </div>
                                            <div class="flex-align gap-4">
                                                <span class="text-sm text-main-600 d-flex"><i class="ph ph-clock"></i></span>
                                                <span class="text-13 text-gray-600">40 Hours</span>
                                            </div>
                                        </div>

                                        <div class="flex-between gap-4 flex-wrap mt-24">
                                            <div class="flex-align gap-4">
                                                <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                            </div>
                                            <a href="course-details.html" class="btn btn-outline-main rounded-pill py-9">View Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-3 col-lg-4 col-sm-6">
                            <div class="card border border-gray-100">
                                <div class="card-body p-8">
                                    <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                        <img src="assets/images/thumbs/course-img9.png" alt="Course Image" />
                                    </a>
                                    <div class="p-8">
                                        <span class="text-13 py-2 px-10 rounded-pill bg-purple-50 text-purple-600 mb-16">AI Solution</span>
                                        <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">Artificial Inteligence</a></h5>

                                        <div class="flex-align gap-8 flex-wrap mt-16">
                                            <img src="assets/images/thumbs/user-img9.png" class="w-28 h-28 rounded-circle object-fit-cover" alt="User Image" />
                                            <div>
                                                <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                            </div>
                                        </div>

                                        <div class="flex-align gap-8 mt-12 pt-12 border-top border-gray-100">
                                            <div class="flex-align gap-4">
                                                <span class="text-sm text-main-600 d-flex"><i class="ph ph-video-camera"></i></span>
                                                <span class="text-13 text-gray-600">24 Lesson</span>
                                            </div>
                                            <div class="flex-align gap-4">
                                                <span class="text-sm text-main-600 d-flex"><i class="ph ph-clock"></i></span>
                                                <span class="text-13 text-gray-600">40 Hours</span>
                                            </div>
                                        </div>

                                        <div class="flex-between gap-4 flex-wrap mt-24">
                                            <div class="flex-align gap-4">
                                                <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                            </div>
                                            <a href="course-details.html" class="btn btn-outline-main rounded-pill py-9">View Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex-between flex-wrap gap-8 mt-20">
                        <a href="#" class="btn btn-outline-gray rounded-pill py-9 flex-align gap-4">
                            <span class="d-flex text-xl"><i class="ph ph-arrow-left"></i></span>
                            Previous
                        </a>

                        <ul class="pagination flex-align flex-wrap">
                            <li class="page-item active">
                                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">1</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">2</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">3</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">...</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">8</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">9</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">10</a>
                            </li>
                        </ul>

                        <a href="#" class="btn btn-outline-main rounded-pill py-9 flex-align gap-4">
                            Next <span class="d-flex text-xl"><i class="ph ph-arrow-right"></i></span>
                        </a>
                    </div>

                </div>
            </div>
            {/* <!-- Recommended Course End --> */}
        </div>
    )
}

export default MyCourses