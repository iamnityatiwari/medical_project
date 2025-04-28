import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { motion } from "framer-motion";

const CurrentAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`/api/appointments/user/${userId}/upcoming`);
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, [userId]);

  const today = moment().startOf("day");

  const groupedAppointments = appointments.reduce((acc, appt) => {
    const apptDate = moment(appt.date).startOf("day");
    const isToday = apptDate.isSame(today, "day");
    const key = isToday ? "Today" : apptDate.format("MMMM D, YYYY");
    if (!acc[key]) acc[key] = [];
    acc[key].push(appt);
    return acc;
  }, {});

  // Mouse movement tilt effect handler
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX; // Range: -1 to 1
    const deltaY = (y - centerY) / centerY; // Range: -1 to 1

    const rotateX = deltaY * 10; // Max tilt angle on the X-axis
    const rotateY = -deltaX * 10; // Max tilt angle on the Y-axis

    // Apply the rotation to the card
    card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = (e) => {
    // Reset the tilt back to normal when the mouse leaves the card
    e.currentTarget.style.transform = "perspective(500px) rotateX(0) rotateY(0)";
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-red-50 to-white px-6 py-10">
      <h1 className="text-4xl font-extrabold text-red-600 mb-10 text-center drop-shadow-md">
        🗓️ Upcoming Appointments
      </h1>

      {Object.keys(groupedAppointments).length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-20">No upcoming appointments.</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-10">
          {Object.entries(groupedAppointments).map(([dateLabel, appts]) => (
            <div key={dateLabel}>
              <h2 className="text-2xl font-bold text-red-500 mb-6 border-b-2 border-red-300 pb-2">
                {dateLabel}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {appts.map((appt, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={resetTilt} // Reset tilt on mouse leave
                  >
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-lg font-semibold text-gray-800">
                        Slot: <span className="text-red-600">{appt.slot}</span>
                      </p>
                      <span
                        className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
                          appt.status === "confirmed"
                            ? "bg-green-200 text-green-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold text-red-600 text-lg">
                        🩺 Dr. {appt.doctor?.name || "Unknown Doctor"}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        ({appt.doctor?.specialization || "General Physician"})
                      </p>
                      <p className="text-sm text-gray-600">
                        🏥 Clinic: {appt.doctor?.clinic || "Unknown Clinic"}
                      </p>
                      <p className="text-sm text-gray-600">
                        🙍 Patient: <span className="font-medium">{appt.name}</span> (Age: {appt.age})
                      </p>
                      {appt.description && (
                        <p className="text-sm text-gray-600">
                          📝 Reason: {appt.description}
                        </p>
                      )}
                    </div>

                    {appt.status === "confirmed" && (
                      <div className="mt-6 text-right">
                        <a
                          href={`/room/room-${appt._id}/${appt.doctorId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
                        >
                          Join Call
                        </a>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrentAppointment;
