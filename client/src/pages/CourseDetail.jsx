import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { Hourglass } from "react-loader-spinner";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/${id}`)
      .then((response) => {
        setCourse(response.data.course);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load course details.");
        setLoading(false);
      });
  }, [id]);

  const handleEnroll = async () => {
    try {
      // Check if the student is logged in
      const user = localStorage.getItem("user");
      if (!user) {
        // Redirect to login page if not logged in
        navigate("/student/login", { state: { from: `/courses/${id}` } });
        return;
      }

      // Check if the student is already enrolled
      const isEnrolled = await axios.get(`http://localhost:3000/courses/${id}/is-enrolled`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (isEnrolled.data.enrolled) {
        alert("You are already enrolled in this course.");
        return;
      }

      // Redirect to payment page if the course is paid
      if (course.price > 0) {
        navigate(`/courses/${id}/payment`);
        return;
      }

      // Enroll the student in the course
      const response = await axios.post(
        `http://localhost:3000/courses/${id}/enroll`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // Redirect to course dashboard
        navigate(`/courses/${id}/dashboard`);
      }
    } catch (error) {
      console.error("Enrollment failed:", error);
      alert("Enrollment failed. Please try again.");
    }
  };

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
          colors={["#306cce", "#72a1ed"]}
        />
      </div>
    );
  }

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

  if (!course)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Course not found.</p>
      </div>
    );

  return (
    <div>
      <Header />
      <div className="w-full bg-gray-50">
        <div className="max-w-9xl mx-auto mt-[68px] px-4 py-8">
          {/* Course Details Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-3 p-5">
            <div className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row gap-48">
                {/* Left Section: Thumbnail and Metadata */}
                <div className="lg:w-1/3 space-y-6">
                  {/* Thumbnail */}
                  <img
                    src={course.thumbnail}
                    alt={course.name}
                    className="w-full h-auto rounded-lg shadow-md"
                  />

                  {/* Metadata */}
                  <div className="bg-blue-50 p-16 rounded-lg text-[18px]">
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        <span className="font-semibold text-blue-800">Code:</span> {course.code}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold text-blue-800">Duration:</span> {course.duration}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold text-blue-800">Category:</span> {course.category}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold text-blue-800">Enrolled:</span> {course.total_students_enrolled} Students
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold text-blue-800">Rating:</span>{" "}
                        <span className="text-yellow-500">{course.rating} ⭐</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Section: Course Information */}
                <div className="lg:w-2/3 relative">
                  {/* Course Name and Description */}
                  <div className="flex gap-3 items-center mb-3">
                    <h1 className="text-4xl font-bold text-gray-900">{course.name}</h1>
                    <p className="text-gray-700">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        {course.status}
                      </span>
                    </p>
                  </div>
                  <p className="text-gray-200 text-md mb-3">{course.description}</p>
                  <p className="text-gray-700 flex gap-2 items-center">
                    <span className="text-blue-600 font-semibold text-3xl flex items-center">
                      ₹{course.price - (course.price * course.discount) / 100}
                    </span>
                    {course.discount > 0 && (
                      <span className="line-through text-gray-100 text-3xl">₹{course.price}</span>
                    )}
                    <span className="ml-2 font-bold bg-yellow-400 text-white px-2 py-1 rounded-full text-sm">
                      {course.discount}% OFF
                    </span>
                  </p>

                  {/* Enroll Button (Sticky) */}
                  <div className="sticky top-4 z-10 my-36 mt-24">
                    {course.status === "open" ? (
                      <button
                        onClick={handleEnroll}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-[100px] py-[13px] rounded-lg text-[18px] font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 w-full lg:w-auto"
                      >
                        Enroll Now
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-zinc-400 text-white px-[100px] py-[13px] rounded-lg text-[18px] font-semibold shadow-lg transition-all duration-200 transform w-full lg:w-auto cursor-not-allowed"
                      >
                        {course.status}
                      </button>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="mb-48">
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Syllabus */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Syllabus</h2>
                    <ul className="space-y-2">
                      {course.syllabus.map((topic, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <span className="text-blue-500 mr-2">•</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Reviews */}
                  <div className="w-full bg-zinc-100 mt-5 p-5">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Reviews</h2>
                    {course.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {course.reviews.map((review, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <span className="text-yellow-500 mr-2">{review.rating} ⭐</span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No reviews yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;