import React, { useEffect, useState } from 'react';
import { Search, Filter, SortDesc } from 'lucide-react';

import { Link } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { Hourglass } from 'react-loader-spinner';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');
  const url = import.meta.env.VITE_BACKEND_URL;
 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${url}/courses`);
        setCourses(response.data.courses);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter and sort courses
  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === 'priceLowToHigh') {
        return (a.price - a.price * (a.discount / 100)) - (b.price - b.price * (b.discount / 100));
      } else if (sortOption === 'priceHighToLow') {
        return (b.price - b.price * (b.discount / 100)) - (a.price - a.price * (a.discount / 100));
      } else if (sortOption === 'ratingHighToLow') {
        return b.rating - a.rating;
      } else {
        return 0; // Default order
      }
    });

  // Extract unique categories for filtering
  const categories = ['All', ...new Set(courses.map((course) => course.category))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#306cce', '#72a1ed']}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className="dashboard-body w-full pt-88">
        {/* Breadcrumb Start */}
        {/* <div className="breadcrumb mb-24 pt-40">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/" className="text-gray-200 fw-normal text-15 hover-text-main-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Student Courses</span>
            </li>
          </ul>
        </div> */}
        {/* Breadcrumb End */}

        {/* Search and Filters Section */}





        <div className="bg-gradient-to-br from-zinc-50 to-blue-50 p-36 mb-12 rounded-sm shadow-md">
          <h2 className="text-2xl font-semibold text-black text-center mb-16">Find Your Perfect Course</h2>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-indigo-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 p-3 bg-white border border-indigo-100 rounded-lg focus:outline-none border border-blue-500 focus:ring-2 focus:ring-indigo-500 shadow-sm text-gray-700"
              />
            </div>

            {/* Category Filter */}
            <div className="relative sm:w-56">
              <Filter className="absolute left-3 top-3 text-indigo-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 p-3 bg-white border border-indigo-100 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-gray-700 pr-8"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-3 pointer-events-none">
                <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Sorting Options */}
            <div className="relative sm:w-56">
              <SortDesc className="absolute left-3 top-3 text-indigo-400 h-5 w-5" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full pl-10 p-3 bg-white border border-indigo-100 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-gray-700 pr-8"
              >
                <option value="default">Sort By</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="ratingHighToLow">Rating: High to Low</option>
              </select>
              <div className="absolute right-3 top-3 pointer-events-none">
                <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Example course cards could be added here */}
          <div className="text-center text-sm text-indigo-500 mt-4">
            Showing results for "{searchQuery || 'all courses'}"
          </div>
        </div>

        {/* Course Tab Start */}
        <div className="card">
          <div className="card-body">
            <div className="mb-24">
              {/* <h1 className="text-2xl font-semibold text-center py-3">All Courses</h1> */}
            </div>
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="alltab" role="tabpanel">
                <div className="all-course">
                  <div className="row">
                    {filteredCourses.map((course) => (
                      <div
                        className="col-xl-3 col-lg-6 col-md-6 col-12"
                        key={course._id}
                        data-aos="fade-up"
                      >
                        <div
                          className="course-box-three"
                          style={{ height: '440px', width: '100%' }}
                        >
                          <div className="course-three-item h-100">
                            {/* Course Image */}
                            <div
                              className="course-three-img"
                              style={{ height: '200px', overflow: 'hidden' }}
                            >
                              <Link to={`/courses/${course._id}`}>
                                <img
                                  className="img-fluid w-full h-full object-cover"
                                  alt={course.name}
                                  src={course.thumbnail}
                                />
                              </Link>
                            </div>

                            {/* Course Content */}
                            <div className="course-three-content m-0 p-4 pt-0 h-[calc(100%-200px)] flex flex-col justify-between overflow-y-auto">
                              <div>
                                {/* Course Category and Name */}
                                <div className="course-three-text">
                                  <Link to={`/courses/${course._id}`}>
                                    <p className="px-3 rounded-xl mb-3">{course.category}</p>
                                    <h3 className="title instructor-text">{course.name}</h3>
                                  </Link>
                                </div>

                                {/* Price and Duration */}
                                <div className="price-three-group d-flex align-items-center justify-content-between">
                                  <div className="price-three-view d-flex align-items-center">
                                    <div className="course-price-three">
                                      <h3>
                                        ₹{course.price - course.price * (course.discount / 100)}{' '}
                                        {course.discount > 0 && (
                                          <span className="text-gray-500 line-through">
                                            ₹{course.price}
                                          </span>
                                        )}
                                      </h3>
                                    </div>
                                  </div>
                                  <div className="price-three-time d-inline-flex align-items-center">
                                    <i className="fa-regular fa-clock me-2"></i>
                                    <span>{course.duration}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Enroll Button */}
                              <div className="mt-auto">
                                {course.status === "open" ? (
                                  <Link
                                    to={`/courses/${course._id}`}
                                    className="mybtn w-full bg-blue-500 text-white p-2 rounded-lg text-center block"
                                  >
                                    Enroll
                                  </Link>
                                ) : (course.status === "closed" ?
                                  <button className="border-2 border-blue-500 w-full bg-red-100 text-red-500 px-4 py-2 rounded-lg">
                                    {course.status}
                                  </button> : <button className="border-2 border-blue-500 w-full bg-blue-100 text-blue-500 px-4 py-2 rounded-lg">
                                    {course.status}
                                  </button>
                                )
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Course Tab End */}
      </div>
    </>
  );
};

export default Courses;