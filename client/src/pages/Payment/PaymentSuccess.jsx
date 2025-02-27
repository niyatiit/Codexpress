import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Hourglass } from "react-loader-spinner"; // For a better loading spinner

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!sessionId) {
        setError("Session ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/payment/success?session_id=${sessionId}`
        );
        setPaymentDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching payment details:", err);
        setError("Failed to fetch payment details. Please try again later.");
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [sessionId]);

  const handleRedirectToDashboard = () => {
    navigate("/student");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#306cce", "#72a1ed"]}
        />
        <p className="mt-4 text-gray-600">Loading payment details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-700">{error}</p>
        <button
          onClick={handleRedirectToDashboard}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      {paymentDetails && (
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <p className="text-gray-700">
            Thank you for your payment. Your transaction ID is:{" "}
            <span className="font-semibold">{paymentDetails.session.id}</span>.
          </p>
          <p className="text-gray-700 mt-2">
            Amount Paid: ₹{(paymentDetails.session.amount_total / 100).toFixed(2)}
          </p>
        </div>
      )}
      <button
        onClick={handleRedirectToDashboard}
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;