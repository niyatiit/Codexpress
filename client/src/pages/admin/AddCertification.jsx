import { useEffect, useState } from "react";

const AddCertificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(" localhost:3000/certificates")
      .then((res) => res.json())
      .then((data) => setCertificates(data));
  }, []);

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.user.name.toLowerCase().includes(search.toLowerCase()) ||
      cert.course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white text-blue-900 min-h-screen">
      <div className="shadow-lg bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Certificate Management</h2>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by student or course"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Issue New Certificate
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Certificate No.</th>
                <th className="border border-gray-300 px-4 py-2">Student Name</th>
                <th className="border border-gray-300 px-4 py-2">Course</th>
                <th className="border border-gray-300 px-4 py-2">Issue Date</th>
                <th className="border border-gray-300 px-4 py-2">Download</th>
              </tr>
            </thead>
            <tbody>
              {filteredCertificates.map((cert) => (
                <tr key={cert._id} className="border border-gray-300 text-center">
                  <td className="border border-gray-300 px-4 py-2">{cert.certificate_number}</td>
                  <td className="border border-gray-300 px-4 py-2">{cert.user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{cert.course.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(cert.issue_date).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a href={cert.certificate_url} download className="text-blue-600 hover:underline">Download</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddCertificate;
