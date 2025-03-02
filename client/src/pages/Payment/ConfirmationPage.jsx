import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Hourglass } from "react-loader-spinner"; // For a better loading spinner
import { CheckCircle, XCircle } from "react-feather"; // For success and error icons
import axios from "axios";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' or 'failed'
  const [sessionDetails, setSessionDetails] = useState(null); // Stripe session details
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id"); // Retrieve session_id from query params

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        if (!sessionId) {
          throw new Error("No session ID found.");
        }

        // Fetch session details from your backend
        const response = await axios.get(
          `http://localhost:3000/payment/success?session_id=${sessionId}`
        );
        const session = response.data.session;

        // Check if the payment was successful
        if (session.payment_status === "paid") {
          setPaymentStatus("success");
          setSessionDetails(session);
        } else {
          setPaymentStatus("failed");
          setError("Payment was not successful.");
        }
      } catch (err) {
        console.error("🚨 Error fetching session details:", err);
        setError(err.message || "Failed to fetch payment details.");
        setPaymentStatus("failed");
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  const handleRedirectToDashboard = () => {
    navigate("/student");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-6">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#306cce", "#72a1ed"]}
        />
        <p className="mt-6 text-gray-600 text-lg font-medium text-center">
          Processing your payment...
        </p>
      </div>
    );
  }

  if (error || paymentStatus === "failed") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-6">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full mx-4">
          <div className="flex justify-center mb-6">
            <XCircle className="text-red-500 w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
          <p className="text-gray-700 text-lg mb-6">
            {error || "There was an issue processing your payment. Please try again."}
          </p>
          <button
            onClick={handleRedirectToDashboard}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full mx-4">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-6">Payment Successful!</h1>
        <p className="text-gray-700 text-lg mb-8">
          Thank you for your payment. Your transaction has been successfully processed.
        </p>
        {sessionDetails && (
          <div className="text-left bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction Details</h2>
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-semibold">Amount Paid:</span> ₹
                {(sessionDetails.amount_total / 100).toFixed(2)}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Course ID:</span> {sessionDetails.metadata.courseId}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">User ID:</span> {sessionDetails.metadata.userId}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Transaction ID:</span> {sessionDetails.id}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Payment Method:</span>{" "}
                {sessionDetails.payment_method_types[0]}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleRedirectToDashboard}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;