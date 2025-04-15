import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyCertificate = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCertNumber = queryParams.get('certificateNumber') || '';
  const [certificateNumber, setCertificateNumber] = useState(initialCertNumber);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (!certificateNumber && !verificationCode) {
      toast.error('Please enter certificate number or verification code');
      return;
    }

    try {
      setIsVerifying(true);
      const response = await axios.get('/api/certificates/verify', {
        params: {
          certificateNumber: certificateNumber || undefined,
          verificationCode: verificationCode || undefined
        }
      });
      setVerificationResult(response.data);
    } catch (error) {
      console.error('Verification failed:', error);
      toast.error(error.response?.data?.message || 'Verification failed');
      setVerificationResult(null);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Verify Certificate</h1>
      
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="certificateNumber">
            Certificate Number:
          </label>
          <input
            type="text"
            id="certificateNumber"
            value={certificateNumber}
            onChange={(e) => setCertificateNumber(e.target.value)}
            placeholder="Enter certificate number"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="verificationCode">
            Or Verification Code:
          </label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          onClick={handleVerify}
          disabled={isVerifying}
          className={`px-6 py-2 rounded text-white ${isVerifying ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {isVerifying ? 'Verifying...' : 'Verify Certificate'}
        </button>
      </div>

      {verificationResult && (
        <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-green-600">
            Certificate Verified Successfully
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Student Information</h3>
              <p><span className="font-medium">Name:</span> {verificationResult.student.name}</p>
              <p><span className="font-medium">Email:</span> {verificationResult.student.email}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Course Information</h3>
              <p><span className="font-medium">Course:</span> {verificationResult.course.name}</p>
              <p><span className="font-medium">Code:</span> {verificationResult.course.code}</p>
              <p><span className="font-medium">Batch:</span> {verificationResult.batch.name}</p>
              <p><span className="font-medium">Duration:</span> {new Date(verificationResult.batch.start_date).toLocaleDateString()} to {new Date(verificationResult.batch.end_date).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="text-xl font-semibold mb-2">Certificate Details</h3>
            <p><span className="font-medium">Certificate Number:</span> {verificationResult.certificate.certificate_number}</p>
            <p><span className="font-medium">Issued On:</span> {new Date(verificationResult.certificate.issue_date).toLocaleDateString()}</p>
            <p><span className="font-medium">Issued By:</span> {verificationResult.issuedBy.name}</p>
            <p><span className="font-medium">Verification Code:</span> {verificationResult.certificate.verification_code}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyCertificate;