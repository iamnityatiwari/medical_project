import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const DoctorListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("/api/doctor");
        setDoctors(res.data);
        console.log("Fetched doctors:", res.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doc) =>
    (doc.name + doc.specialization).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-red-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-8">
          Available Doctors
        </h2>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading doctors...</p>
        ) : filteredDoctors.length > 0 ? (
          <div className="grid gap-6 grid-cols-1">
          {filteredDoctors.map((doc) => (
            <div
              key={doc._id}
              onClick={() => navigate(`/user/doctor/${doc._id}`)}
              className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {doc.name}
              </h3>
              <p className="text-red-600 font-medium">{doc.specialization}</p>
            </div>
          ))}
        </div>
        ) : (
          <p className="text-center text-gray-600">No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorListPage;
