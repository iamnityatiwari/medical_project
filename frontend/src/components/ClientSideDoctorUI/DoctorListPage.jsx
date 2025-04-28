import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaSearch } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion"; // Animation library
import myImage from "../../images/abc.webp"; // Static fallback image

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("/api/doctor");
        setDoctors(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doc) => {
    const name = doc.name || "";
    const specialization = doc.specialization || "";
    return (name + " " + specialization)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-8 text-red-600 drop-shadow-md">
        Find Your Doctor
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-2 border-red-400 rounded-full py-2 px-10 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center text-gray-500 col-span-3">Loading doctors...</p>
        ) : filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <motion.div
              key={doctor._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-50 shadow-lg rounded-2xl p-6 transition duration-300 hover:shadow-2xl"
            >
              <Link
                to={`/user/doctor/${doctor._id}`}
                className="flex flex-col items-center text-center"
              >
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md bg-red-200">
                  <img
                    src={myImage}
                    alt="Doctor Avatar"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = myImage;
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Doctor Info */}
                <h2 className="text-xl font-bold text-red-700">{doctor.name}</h2>
                <p className="text-sm text-gray-600">{doctor.specialization || "General Physician"}</p>
                <p className="text-xs text-gray-400">{doctor.location || "Unknown Location"}</p>

                {/* Rating */}
                <div className="flex items-center justify-center mt-3">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      size={18}
                      color={index < Math.round(doctor.rating) ? "#facc15" : "#e5e7eb"}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {doctor.rating ? doctor.rating.toFixed(1) : "0.0"}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No doctors found!</p>
        )}
      </div>
    </div>
  );
};

export default DoctorListPage;
