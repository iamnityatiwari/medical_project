import React, { useEffect, useState } from "react";
import axios from "axios";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// Group appointments by date
const groupByDate = (appointments) => {
  const grouped = {};
  appointments.forEach((appt) => {
    const dateKey = formatDate(appt.appointmentTime);
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(appt);
  });
  return grouped;
};

export default function AppointmentHistoryPage() {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const doctorId = localStorage.getItem("userId");


  const getYesterdayISTDateString = () => {
    const now = new Date();
    // Convert to IST by adding 5.5 hours
    const offset = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(now.getTime() + offset);
    // Subtract 1 day
    istNow.setDate(istNow.getDate() - 1);
    return istNow.toISOString().split("T")[0];
  };


  useEffect(() => {
    const fetchPastAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/appointments/doctor/${doctorId}/past`
        );
        setAppointments(response.data);
      } catch (err) {
        console.error("Failed to fetch past appointments", err);
      }
    };

    fetchPastAppointments();
  }, [doctorId]);

  // Filter appointments by name/email and date
  const filteredAppointments = appointments.filter((appt) => {
    const patientName = appt.user?.name?.toLowerCase() || "";
    const patientEmail = appt.user?.email?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();

    const matchNameOrEmail =
      patientName.includes(query) || patientEmail.includes(query);

    const matchDate = filterDate
      ? new Date(appt.appointmentTime).toISOString().split("T")[0] === filterDate
      : true;

    return matchNameOrEmail && matchDate;
  });

  const groupedAppointments = groupByDate(filteredAppointments);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-6">
        Appointment History
      </h1>

      {/* Search and Date Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by patient name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full sm:w-1/2"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          max={getYesterdayISTDateString()} // Prevent today & future
          className="border border-gray-300 p-2 rounded w-full sm:w-1/3"
        />

      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-red-100 text-red-700 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">S.No</th>
              <th className="px-6 py-3">Patient Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Slot</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No matching appointments found.
                </td>
              </tr>
            ) : (
              Object.entries(groupedAppointments).map(([date, appts]) => (
                <React.Fragment key={date}>
                  <tr className="bg-gray-100 text-red-700 font-semibold text-sm">
                    <td colSpan="5" className="px-6 py-3">
                      {date}
                    </td>
                  </tr>
                  {appts.map((appt, index) => (
                    <tr key={appt._id || index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{appt.user?.name || "N/A"}</td>
                      <td className="px-6 py-4">{appt.user?.email || "N/A"}</td>
                      <td className="px-6 py-4">{appt.slot || "N/A"}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${appt.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : appt.status === "Cancelled"
                                ? "bg-gray-300 text-gray-700"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
