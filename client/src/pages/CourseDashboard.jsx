import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const CourseDashboard = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(response.data.course);
      } catch (error) {
        setError("Failed to load course details.");
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Course Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">{course.name}</h2>
          <p className="text-gray-700 mt-2">{course.description}</p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue-800">Syllabus</h3>
            <ul className="list-disc list-inside mt-2">
              {course.syllabus.map((topic, index) => (
                <li key={index} className="text-gray-700">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDashboard;