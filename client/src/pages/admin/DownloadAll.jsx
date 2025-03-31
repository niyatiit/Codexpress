import React, { useState } from 'react';
import axios from 'axios';

const DownloadAll = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleDownloadAll = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.get('http://localhost:3000/reports/download-all', {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'codexpress-invoices.zip');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
      setMessage('Download started successfully!');
    } catch (error) {
      console.error('Error downloading invoices:', error);
      setMessage('Error downloading invoices. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Download All Invoices</h1>
        <p className="mb-6">Click the button below to download all student invoices as a ZIP file.</p>
        
        <button
          onClick={handleDownloadAll}
          disabled={loading}
          className={`bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Preparing Download...' : 'Download All Invoices'}
        </button>
        
        {message && (
          <p className={`mt-4 ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
        
        <div className="mt-6 text-sm text-gray-500">
          <p>Note: This process might take a few moments depending on the number of invoices.</p>
        </div>
      </div>
    </div>
  );
};

export default DownloadAll;