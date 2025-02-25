import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Cookies from "js-cookie";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/courses/${id}/payment`);
        setCourse(response.data.course);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch course details.");
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handlePaymentSuccess = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = Cookies?.get("token"); 
        const response = await axios.post(
        `http://localhost:3000/courses/${id}/enroll`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        navigate(`/courses/${id}/dashboard`);
      }
    } catch (error) {
      setError("Payment failed. Please try again.");
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><p className="text-lg text-blue-600">Loading payment details...</p></div>;
  if (error) return <div className="flex items-center justify-center min-h-screen"><p className="text-red-500">{error}</p></div>;
  if (!course) return <div className="flex items-center justify-center min-h-screen"><p className="text-gray-600">Course not found.</p></div>;

  return (
    <div>
      <Header />
      <div className="w-full bg-gray-50">
        <div className="max-w-9xl mx-auto mt-[68px] px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden p-5">
            <div className="p-6 md:p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Complete Your Payment</h1>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Course Details</h2>
                <p className="text-gray-700">
                  <span className="font-semibold">Course Name:</span> {course.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Price:</span>{" "}
                  <span className="line-through">₹{course.price}</span>
                  <span className="ml-2 text-blue-600">
                    ₹{course.finalPrice}
                  </span>
                  <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {course.discount}% OFF
                  </span>
                </p>
              </div>

              {/* Payment Gateway Integration (Placeholder) */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <p className="text-gray-700">Integrate your payment gateway here.</p>
                </div>
              </div>

              {/* Proceed to Payment Button */}
              <button
                onClick={handlePaymentSuccess}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;