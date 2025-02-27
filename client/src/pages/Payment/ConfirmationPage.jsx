// ConfirmationPage.jsx
const ConfirmationPage = () => {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-grow container mt-[100px] sm:px-6 lg:py-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-24 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Payment Successful</h1>
  
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
                      <div className="h-full bg-blue-600 w-full"></div>
                    </div>
  
                    {/* Step 2 */}
                    <div className="flex flex-col items-center z-10">
                      <div className="w-30 h-30 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mb-2">2</div>
                      <div className="text-sm md:text-base font-medium text-gray-700">Payment</div>
                    </div>
                  </div>
                </div>
  
                {/* Success Message */}
                <div className="bg-green-50 p-4 md:p-6 rounded-lg mb-6">
                  <h2 className="text-lg md:text-xl font-semibold text-green-800 mb-4">Payment Successful</h2>
                  <p className="text-gray-700">Thank you for your purchase! You can now access the course.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmationPage;