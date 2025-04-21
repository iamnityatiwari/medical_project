import React from "react";

// Dummy past appointment data
const pastAppointments = [
  {
    id: 1,
    patientName: "Anjali Desai",
    date: "2025-04-15",
    time: "10:30 AM",
    status: "Completed",
  },
  {
    id: 2,
    patientName: "Vikram Joshi",
    date: "2025-04-14",
    time: "02:00 PM",
    status: "Cancelled",
  },
  {
    id: 3,
    patientName: "Nina Thakur",
    date: "2025-04-13",
    time: "11:15 AM",
    status: "Completed",
  },
];

export default function AppointmentHistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-6">Appointment History</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-red-100 text-red-700 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Patient Name</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {pastAppointments.map((appt) => (
              <tr key={appt.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{appt.patientName}</td>
                <td className="px-6 py-4">{appt.date}</td>
                <td className="px-6 py-4">{appt.time}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appt.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
