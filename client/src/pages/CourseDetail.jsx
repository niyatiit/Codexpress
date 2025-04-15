import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { Hourglass } from "react-loader-spinner";

axios.defaults.withCredentials = true; // Allow cookies to be sent

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [review, setReview] = useState({ comment: "", rating: 0 });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Step 1: Check if the user is logged in
    if (!token || !user) {
      navigate(`/student/login?redirect=/courses/${id}`);
      console.log("user not logged in!!")
      return;
    }

    // Fetch course details
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/courses/${id}`);
        setCourse(response.data.course);
      } catch (error) {
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    // Check if the student is enrolled in the course
    const checkEnrollment = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/enrollments/check-enrollment`, {
          params: { userId: user.id, courseId: id },
        });
        setIsEnrolled(response.data.isEnrolled);
      } catch (error) {
        console.error("Error checking enrollment:", error);
      }
    };

    fetchCourseDetails();
    checkEnrollment();
  }, [id, token, user, navigate]);

  const handleEnroll = () => {
    if (!token || !user) {
      navigate(`/student/login?redirect=/profile-completion`);
      return;
    }

    if (user.role !== "student") {
      setError("Only students can enroll in courses.");
      return;
    }

    navigate(`/profile-completion?redirect=/courses/checkout/${id}`);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!review.comment || review.rating === 0) {
      setError("Please provide a comment and rating.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/courses/${id}/reviews`, {
        enrollmentId: user.id, // Assuming enrollmentId is the same as user._id
        courseId: id,
        comment: review.comment,
        rating: review.rating,
      });

      if (response.data.success) {
        alert("Review added successfully!");
        setCourse((prevCourse) => ({
          ...prevCourse,
          reviews: [...prevCourse.reviews, response.data.review],
        }));
        setReview({ comment: "", rating: 0 });
        setError(null);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to submit review. Please try again.");
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

  if (error) {
    return (
      <div className="flex items-center justify-center flex-col min-h-screen">
        <p className="text-red-500 text-xl">{error}</p>
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded-md mt-3"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Course not found.</p>
      </div>
    );
  }

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
                  <p className="text-gray-600 text-md mb-3">{course.description}</p>
                  <p className="text-gray-700 flex gap-2 items-center">
                    <span className="text-blue-600 font-semibold text-3xl flex items-center">
                      ₹{course.price - (course.price * course.discount) / 100}
                    </span>
                    {course.discount > 0 && (
                      <span className="line-through text-gray-400 text-3xl">₹{course.price}</span>
                    )}
                    <span className="ml-2 font-bold bg-yellow-400 text-white px-2 py-1 rounded-full text-sm">
                      {course.discount}% OFF
                    </span>
                  </p>

                  {/* Enroll Button (Sticky) */}
                  <div className="sticky top-4 z-10 my-36 mt-24">
                    {isEnrolled ? (
                      <button
                        disabled
                        className="bg-zinc-400 text-white px-[100px] py-[13px] rounded-lg text-[18px] font-semibold shadow-lg transition-all duration-200 transform w-full lg:w-auto cursor-not-allowed"
                      >
                        Already Enrolled
                      </button>
                    ) : course.status === "open" ? (
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
                    <div dangerouslySetInnerHTML={{ __html: course.syllabus }} />
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="w-full bg-blue-100 mt-5 p-5">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Reviews</h2>
                {isEnrolled && (
                  <form onSubmit={handleReviewSubmit} className="mb-6">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
                      <select
                        value={review.rating}
                        onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
                        className="w-full p-2 border rounded-lg"
                        required
                      >
                        <option value={0}>Rate This Course</option>
                        <option value={1}>⭐ (Poor)</option>
                        <option value={2}>⭐⭐ (Needs Improvement)</option>
                        <option value={3}>⭐⭐⭐ (Average)</option>
                        <option value={4}>⭐⭐⭐⭐ (Good)</option>
                        <option value={5}>⭐⭐⭐⭐⭐ (Excellent)</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Comment</label>
                      <textarea
                        value={review.comment}
                        onChange={(e) => setReview({ ...review, comment: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                        rows="4"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
                {course.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {course.reviews.map((review, index) => (
                      <div key={index} className="bg-white p-4 mt-3 rounded-lg shadow-sm">
                        <div className="flex items-center mb-2">
                          <div className="flex gap-2 items-center">
                            <img
                              src={review.student_id.profile_picture || "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"}
                              alt="Profile"
                              className="w-36 h-36 bg-blue-500 rounded-full"
                            />
                            <div className="flex flex-col">
                              <span className="text-blue-500 font-medium">
                                {review.student_id.first_name} {review.student_id.last_name}
                              </span>
                              <span className="text-zinc-400 text-sm font-medium">
                                @{review.student_id.username}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="text-yellow-500 mr-2">
                          {Array.from({ length: review.rating }, (_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </span>
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
  );
};

export default CourseDetail;