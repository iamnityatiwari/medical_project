import React, { useEffect, useState } from "react";
import axios from "axios";

// Helper function to format the date
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function UpcomingAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const userId = localStorage.getItem("userId"); // Assuming doctorId

  useEffect(() => {
    fetchAppointments();
  }, [userId]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/appointments/doctor/${userId}/upcoming`
      );
      
      const allAppointments = response.data;

      // Get today's date and set it to midnight
      const today = new Date();
      today.setHours(0, 0, 0, 0); // set to start of today

      // Get tomorrow's date by adding one day to today
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1); // set to start of tomorrow

      // Filter out appointments before tomorrow
      const filteredAppointments = allAppointments.filter(appt => {
        const appointmentDate = new Date(appt.appointmentTime);
        return appointmentDate >= tomorrow; // Keep only appointments from tomorrow onwards
      });

      setAppointments(filteredAppointments);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  };

  const updateStatus = async (appointmentId, status) => {
    try {
      await axios.put(`http://localhost:8080/api/appointments/${appointmentId}/status`, {
        status,
        doctorId: userId,
      });
      fetchAppointments(); // Refresh list
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Status update failed");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-red-600 mb-1">
        Upcoming Appointments
      </h1>
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-red-100 text-red-800 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Patient</th>
              <th className="px-6 py-3">Age</th>
              <th className="px-6 py-3">Slot</th>
              <th className="px-6 py-3">Date</th> {/* Added column for Date */}
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-6 py-4">{appt.name}</td>
                <td className="px-6 py-4">{appt.age}</td>
                <td className="px-6 py-4">{appt.slot}</td>
                <td className="px-6 py-4">{formatDate(appt.appointmentTime)}</td> {/* Displaying the formatted date */}
                <td className="px-6 py-4">{appt.description}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appt.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : appt.status === "confirmed"
                        ? "bg-blue-100 text-blue-800"
                        : appt.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  {appt.status !== "completed" && appt.status !== "cancelled" && (
                    <button
                      onClick={() => updateStatus(appt._id, "cancelled")}
                      className="px-3 py-1 rounded bg-red-600 text-white text-xs hover:bg-red-700"
                    >
                      Cancel Appointment
                    </button>
                  )}
                  {(appt.status === "completed" || appt.status === "cancelled") && (
                    <span className="text-xs text-gray-400 italic">
                      No actions available
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-400">
                  No upcoming appointments.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
