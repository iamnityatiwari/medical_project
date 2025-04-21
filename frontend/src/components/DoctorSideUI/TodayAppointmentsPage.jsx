import React from "react";

const today = new Date().toLocaleDateString("en-IN", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// Dummy data for a single doctor
const doctorAppointments = [
  {
    id: 1,
    patientName: "Aarav Singh",
    time: "10:00 AM",
    sequence: 1,
    registrationId: "REG1234",
    status: "Pending",
  },
  {
    id: 2,
    patientName: "Priya Patel",
    time: "11:30 AM",
    sequence: 2,
    registrationId: "REG5678",
    status: "Completed",
  },
  {
    id: 3,
    patientName: "Karan Malhotra",
    time: "01:15 PM",
    sequence: 3,
    registrationId: "REG9101",
    status: "Cancelled",
  },
];

export default function TodayAppointmentsPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-red-600 mb-1">
        Dr. Meena Sharma's Appointments
      </h1>
      <p className="text-gray-600 mb-6">{today}</p>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-red-100 text-red-800 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Patient</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Reg. ID</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctorAppointments.map((appt, index) => (
              <tr key={appt.id} className="border-b">
                <td className="px-6 py-4 font-medium">{appt.sequence}</td>
                <td className="px-6 py-4">{appt.patientName}</td>
                <td className="px-6 py-4">{appt.time}</td>
                <td className="px-6 py-4">{appt.registrationId}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appt.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : appt.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="px-3 py-1 rounded bg-green-600 text-white text-xs hover:bg-green-700">
                    Complete
                  </button>
                  <button className="px-3 py-1 rounded bg-red-600 text-white text-xs hover:bg-red-700">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
