import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header";

const CancelPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId"); // Extract courseId from URL
    console.log(courseId);
    
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex-grow container mt-[100px] sm:px-6 lg:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-24 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Payment Cancelled</h1>

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
                    <div className="h-full bg-blue-600 w-1/2"></div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center z-10">
                    <div className="w-30 h-30 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-semibold mb-2">2</div>
                    <div className="text-sm md:text-base font-medium text-gray-500">Payment</div>
                  </div>
                </div>
              </div>

              {/* Cancellation Message */}
              <div className="bg-red-50 p-4 md:p-6 rounded-lg mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-red-800 mb-4">Payment Not Completed</h2>
                <p className="text-gray-700">
                  It looks like you cancelled the payment process. If this was a mistake, you can retry the payment below.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate(-1)} // Go back to the previous page
                  className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                >
                  Go Back
                </button>
                <button
                  onClick={() => navigate(`/courses/${courseId}/payment`)} // Redirect to the payment page
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                >
                  Retry Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;