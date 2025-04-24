import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const HistoryAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPastAppointments = async () => {
      try {
        const res = await axios.get(`/api/appointments/user/${userId}/past`);
        setAppointments(res.data);
      } catch (error) {
        console.error("Error fetching past appointments:", error);
      }
    };
    fetchPastAppointments();
  }, [userId]);

  const groupedAppointments = appointments.reduce((acc, appt) => {
    const dateKey = moment(appt.date).format("MMMM D, YYYY");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(appt);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
        Appointment History
      </h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No past appointments found.</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-8">
          {Object.entries(groupedAppointments).map(([dateLabel, appts]) => (
            <div key={dateLabel}>
              <h2 className="text-xl font-semibold text-red-500 mb-4 border-b border-red-200 pb-1">
                {dateLabel}
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                {appts.map((appt, idx) => (
                  <div
                    key={idx}
                    className="bg-red-50 border border-red-200 p-5 rounded-2xl shadow-sm transition-transform hover:scale-[1.01]"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="font-medium text-gray-800">
                          Slot: {appt.slot}
                        </p>
                        <p className="text-sm text-gray-600">
                          Time: {moment(appt.appointmentTime).format("hh:mm A")}
                        </p>
                      </div>
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                        {appt.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-gray-800 font-semibold">
                        🩺 Dr. {appt.doctor?.name} ({appt.doctor?.specialization})
                      </p>
                      <p className="text-sm text-gray-600">
                        🏥 Clinic: {appt.doctor?.clinic}
                      </p>
                      <p className="text-sm text-gray-600">
                        🙍 Name: {appt.name}, Age: {appt.age}
                      </p>
                      {appt.description && (
                        <p className="text-sm text-gray-600">
                          📝 Notes: {appt.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryAppointment;
