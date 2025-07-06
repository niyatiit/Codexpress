import { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

export default function ReportPage() {
  const [filters, setFilters] = useState({ course: "", batch: "", paymentStatus: "" });
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    fetchReports();
  }, [filters]);

  const fetchReports = async () => {
    try {
      const response = await axios.get("/api/reports", { params: filters });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const downloadInvoice = async (id) => {
    try {
      const response = await axios.get(`/api/reports/download-invoice/${id}`, { responseType: "blob" });
      saveAs(response.data, `invoice_${id}.pdf`);
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  const downloadAllInvoices = async () => {
    try {
      const response = await axios.get("/api/reports/download-all", { responseType: "blob" });
      saveAs(response.data, "all_invoices.zip");
    } catch (error) {
      console.error("Error downloading all invoices:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Reports</h1>
      <div className="bg-white shadow-md rounded-lg p-4 grid grid-cols-3 gap-4">
        <select className="border p-2 rounded" value={filters.course} onChange={(e) => setFilters({ ...filters, course: e.target.value })}>
          <option value="">All Courses</option>
          <option value="mern">MERN</option>
          <option value="python">Python</option>
        </select>
        <select className="border p-2 rounded" value={filters.batch} onChange={(e) => setFilters({ ...filters, batch: e.target.value })}>
          <option value="">All Batches</option>
          <option value="batch1">Batch 1</option>
          <option value="batch2">Batch 2</option>
        </select>
        <select className="border p-2 rounded" value={filters.paymentStatus} onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}>
          <option value="">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Course</th>
              <th className="border border-gray-300 p-2">Batch</th>
              <th className="border border-gray-300 p-2">Payment Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="text-center border border-gray-300">
                <td className="border border-gray-300 p-2">{student.name}</td>
                <td className="border border-gray-300 p-2">{student.course}</td>
                <td className="border border-gray-300 p-2">{student.batch}</td>
                <td className="border border-gray-300 p-2">{student.paymentStatus}</td>
                <td className="border border-gray-300 p-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => downloadInvoice(student._id)}>Download Invoice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700" onClick={downloadAllInvoices}>
        Download All Invoices
      </button>
    </div>
  );
}
