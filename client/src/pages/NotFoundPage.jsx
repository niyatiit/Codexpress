import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const NotFoundPage=()=> {
const navigate=useNavigate()
const handleRedirect=()=>{
navigate(-1)
}
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white text-center px-6">
        <h1 className="text-[120px] font-bold text-blue-600 leading-none">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="text-gray-500 mt-2 max-w-lg">
          The page you’re looking for doesn’t exist or has been moved. Let's get you back on track.
        </p>
  
        <button onClick={handleRedirect}
          className="mt-6 px-12 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-md shadow-md transition duration-300"
        >
          Go Back
        </button>
  
        <div className="border-t w-2/3 border-gray-300 pt-4 text-sm text-gray-400 position-absolute bottom-6">
          <p>🚀 Code Express | Keep Coding, Keep Growing</p>
        </div>
      </div>
    );
  }
  export default NotFoundPage