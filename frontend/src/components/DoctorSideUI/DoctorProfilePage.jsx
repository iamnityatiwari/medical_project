import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorProfilePage() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchDoctor = async () => {
      const userRole = localStorage.getItem("userRole");
      const userId = localStorage.getItem("userId");

      if (userRole !== "doctor" || !userId) {
        console.warn("Not authorized or no doctor ID found.");
        return;
      }

      try {
        const res = await axios.get(`/api/doctor/${userId}`);
        setDoctor(res.data);
      } catch (err) {
        console.error("Failed to fetch doctor", err);
      } finally {
        setLoading(false); // Set loading to false once data is fetched or an error occurs
      }
    };

    fetchDoctor();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-4 border-red-500 rounded-full"></div>
      </div>
    );
  }

  if (!doctor) {
    return <p className="p-6">Doctor not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Doctor Profile</h1>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-red-300">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">{doctor.name}</h2>
          <p className="text-red-600 font-medium">{doctor.specialization}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-gray-700">
          <div><strong>Email:</strong> <p>{doctor.email}</p></div>
          <div><strong>Phone:</strong> <p>{doctor.phone}</p></div>
          <div><strong>Experience:</strong> <p>{doctor.experience}</p></div>
          <div><strong>Education:</strong> <p>{doctor.education}</p></div>
          <div className="sm:col-span-2">
            <strong>Clinic:</strong> <p>{doctor.clinic}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
