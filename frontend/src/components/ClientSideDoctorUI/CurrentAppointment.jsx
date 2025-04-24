import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CurrentAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

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

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-4xl font-extrabold text-red-600 mb-8">Your Appointments</h1>
      {Object.keys(groupedAppointments).length === 0 ? (
        <p className="text-gray-500">No upcoming appointments.</p>
      ) : (
        Object.entries(groupedAppointments).map(([dateLabel, appts]) => (
          <div key={dateLabel} className="mb-8">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">{dateLabel}</h2>
            <div className="space-y-6">
              {appts.map((appt, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold text-gray-800">Slot: {appt.slot}</p>
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        appt.status === "confirmed"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Doctor ID: {appt.doctorId}</p>
                  <p className="text-sm text-gray-600">Name: {appt.name}, Age: {appt.age}</p>
                  <p className="text-sm text-gray-600">Reason: {appt.description}</p>

                  {appt.status === "confirmed" && (
                    <div className="mt-4 text-right">
                      <a
                        href={`/room/room-${appt._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Join Call
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CurrentAppointment;
