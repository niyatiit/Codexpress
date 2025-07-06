import React from 'react';

const StudentCertificateView = () => {
  const certificates = [
    {
      id: 'cert-001',
      course: 'Web Development Fundamentals',
      issuedDate: '2023-06-15',
      score: 92,
      downloadUrl: '#'
    }
  ];

  return (
    <div className="dashboard-body">
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <a href="/student" className="text-gray-200 fw-normal text-15 hover-text-main-600">
                Home
              </a>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">My Certificates</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between">
          <h5 className="mb-0">My Certificates</h5>
        </div>
        <div className="card-body">
          {certificates.length > 0 ? (
            <div className="grid gap-16">
              {certificates.map((cert) => (
                <div key={cert.id} className="card card-hover">
                  <div className="card-body">
                    <div className="flex-between mb-12">
                      <div>
                        <h6 className="mb-4">{cert.course}</h6>
                        <div className="flex-align gap-16">
                          <div>
                            <small className="text-gray-500 d-block">Issued On</small>
                            <span className="fw-medium">{cert.issuedDate}</span>
                          </div>
                          <div>
                            <small className="text-gray-500 d-block">Score</small>
                            <span className="fw-medium text-main-600">{cert.score}/100</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <a
                          href={cert.downloadUrl}
                          className="btn btn-main rounded-pill"
                          download
                        >
                          <i className="ph ph-download me-2"></i>Download
                        </a>
                      </div>
                    </div>
                    <div className="certificate-preview bg-light p-16 text-center rounded-8">
                      <img
                        src="/placeholder-certificate.jpg"
                        alt="Certificate Preview"
                        className="img-fluid rounded-4"
                        style={{ maxHeight: '200px' }}
                      />
                      <small className="text-gray-500 d-block mt-8">
                        Preview of your certificate
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <div className="mb-16">
                <img
                  src="/empty-certificate.svg"
                  alt="No Certificates"
                  style={{ height: '120px' }}
                />
              </div>
              <h5 className="mb-8">No Certificates Yet</h5>
              <p className="text-gray-500 mb-16">
                Complete a course to earn your first certificate!
              </p>
              <a href="/student/courses" className="btn btn-main rounded-pill">
                View My Courses
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCertificateView;