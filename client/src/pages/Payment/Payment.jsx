import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false); // New state for payment loading
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/courses/${id}`);
        setCourse(response.data.course);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch course details.");
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handlePayment = async () => {
    if (!course) {
      console.error("Course is not loaded yet");
      return;
    }

    setPaymentLoading(true); // Start payment loading

    try {
      const token = localStorage.getItem("token");
      console.log("courseId:", course._id); // Check the value of course._id
      const cancel_url = `http://localhost:5173/payment/cancel?courseId=${course._id}`;
      console.log("cancel_url:", cancel_url);

      const response = await axios.post(
        "http://localhost:3000/payment/create-checkout-session",
        {
          courseId: course._id, // Use course._id
          userId: user.id,
          price: calculateFinalPrice(),
          success_url: "http://localhost:5173/payment/success",
          cancel_url: cancel_url, // Include courseId
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Simulate loading for 2 seconds before redirecting
      setTimeout(() => {
        window.location.href = response.data.url;
      }, 2000);
    } catch (error) {
      console.error("Error in handlePayment:", error); // Log any errors
      setError("Payment initiation failed.");
      setPaymentLoading(false); // Stop payment loading on error
    }
  };

  // Calculate the final price once to avoid inconsistencies
  const calculateFinalPrice = () => {
    if (!course) return 0;
    return course.finalPrice || course.price - (course.price * course.discount) / 100;
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg text-blue-600">Loading course details...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-500">{error}</p>
    </div>
  );

  if (!course) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-600">Course not found.</p>
    </div>
  );

  const finalPrice = calculateFinalPrice();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex-grow container mt-[100px] sm:px-6 lg:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-24 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Complete Your Payment</h1>

              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="relative flex items-center justify-around">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center z-10">
                    <div className="w-30 h-30 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mb-2">1</div>
                    <div className="text-sm md:text-base font-medium text-gray-700">Course Details</div>
                  </div>

                  {/* Progress Line */}
                  <div className="absolute top-5 left-0 right-0 h-1 transform -translate-y-1/2 bg-gray-200">
                    <div className={`h-full bg-blue-600 ${paymentLoading ? "w-full" : "w-1/2"}`}></div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center z-10">
                    <div className={`w-30 h-30 ${paymentLoading ? "bg-blue-600" : "bg-gray-200"} rounded-full flex items-center justify-center text-white font-semibold mb-2`}>2</div>
                    <div className={`text-sm md:text-base font-medium ${paymentLoading ? "text-gray-700" : "text-gray-500"}`}>Payment</div>
                  </div>
                </div>
              </div>

              {/* Course Details Section */}
              <div className="bg-blue-50 p-4 md:p-6 rounded-lg mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-blue-800 mb-4">Course Details</h2>
                <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                  <img
                    src={course.thumbnail}
                    alt={course.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/640x360?text=Course+Thumbnail";
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.name}</h3>
                <div className="flex flex-wrap items-baseline gap-2 mt-3">
                  <span className="text-blue-600 font-semibold text-2xl md:text-3xl">
                    ₹{finalPrice.toLocaleString()}
                  </span>
                  {course.discount > 0 && (
                    <>
                      <span className="line-through text-gray-500 text-lg">
                        ₹{course.price.toLocaleString()}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
                        {course.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Payment Summary Section */}
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg mb-6 border border-gray-100">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Payment Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Course Price</span>
                    <span className="text-gray-900 font-semibold">₹{course.price.toLocaleString()}</span>
                  </div>
                  {course.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600 font-semibold">
                        - ₹{((course.price * course.discount) / 100).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-3 mt-2">
                    <span className="text-gray-800 font-semibold">Total Amount</span>
                    <span className="text-blue-600 font-bold text-xl">
                      ₹{finalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Proceed to Payment Button */}
              <button
                onClick={handlePayment}
                disabled={paymentLoading} // Disable button during payment loading
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {paymentLoading ? "Processing..." : "Proceed to Payment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;