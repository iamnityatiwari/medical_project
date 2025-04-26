import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorForm from "./DoctorForm";

export default function DoctorProfilePage() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

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
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  const handleSave = async (updatedData) => {
    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.put(`/api/doctor/${userId}`, updatedData);
      setDoctor(res.data);
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update doctor profile", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="border-4 border-red-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-xl text-gray-600">Doctor not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
        <div className="flex justify-between items-center border-b pb-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-red-600">{doctor.name}</h1>
            <p className="text-gray-500 text-sm mt-1">{doctor.email}</p>
          </div>
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {!editMode ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Specialization</h2>
              <p>{doctor.specialization || "-"}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Phone</h2>
              <p>{doctor.phone || "-"}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Experience</h2>
              <p>{doctor.experience || "-"}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Education</h2>
              <p>{doctor.education || "-"}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Clinic</h2>
              <p>{doctor.clinic || "-"}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Location</h2>
              <p>{doctor.location || "-"}</p>
            </div>

            {/* Financials and Rating */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Fee</h2>
              <p>₹{doctor.fee || 300}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Rating</h2>
              <p>{doctor.rating?.toFixed(1) || "0.0"}</p>
            </div>

            {/* Appointment Settings */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Interval (Minutes)</h2>
              <p>{doctor.interval || 15}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Current Queue</h2>
              <p>{doctor.currentQueue || 0}</p>
            </div>

            {/* Timings */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Start Time</h2>
              <p>{doctor.startTime || "16:00"}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">End Time</h2>
              <p>{doctor.endTime || "23:00"}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Break Start</h2>
              <p>{doctor.breakStart || "19:00"}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Break End</h2>
              <p>{doctor.breakEnd || "19:40"}</p>
            </div>
          </div>
        ) : (
          <DoctorForm doctorData={doctor} onSave={handleSave} />
        )}
      </div>
    </div>
  );
}
