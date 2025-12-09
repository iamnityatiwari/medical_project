import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
  const userId = localStorage.getItem('userId');
  const doctorId = userId;

  // State for counts and data
  const [totalPatients, setTotalPatients] = useState(0);
  const [appointmentsToday, setAppointmentsToday] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState(0);
  const [appointmentHistory, setAppointmentHistory] = useState(0);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  const fetchData = async () => {
    try {
      // Get past appointments history
      const pastAppointmentsResponse = await axios.get(`/api/appointments/doctor/${doctorId}/past`);
      setAppointmentHistory(pastAppointmentsResponse.data.length);

      // Get upcoming appointments
      const upcomingAppointmentsResponse = await axios.get(`/api/appointments/doctor/${doctorId}/upcoming`);
      const upcomingAppointmentsData = upcomingAppointmentsResponse.data;

      // Get today's date
      const today = new Date().toISOString().slice(0, 10);

      // Filter today's appointments
      const todayAppointments = upcomingAppointmentsData.filter(appt => {
        const appointmentDate = new Date(appt.appointmentTime).toISOString().slice(0, 10);
        return appointmentDate === today;
      });

      setAppointmentsToday(todayAppointments.length);
      setUpcomingAppointments(upcomingAppointmentsData.length-todayAppointments.length);

      // Get patients
      const patientDataResponse = await axios.get(`/api/appointments/doctor/${doctorId}/unique-patients`);
      setPatients(patientDataResponse.data.patients || []);
      setTotalPatients(patientDataResponse.data.count);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [doctorId]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white py-8 px-4">
      <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-4xl">
        
        {/* Header */}
        <h1 className="text-4xl font-semibold text-red-600 mb-6 text-center">Doctor Dashboard</h1>

        {/* Total Patients and Appointments Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
            <h2 className="text-xl font-semibold text-red-600">Today's Appointments</h2>
            <p className="text-3xl font-bold text-red-600">{appointmentsToday}</p>
          </div>

          <div className="bg-red-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
            <h2 className="text-xl font-semibold text-red-600">Upcoming Appointments</h2>
            <p className="text-3xl font-bold text-red-600">{upcomingAppointments}</p>
          </div>

          <div className="bg-red-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
            <h2 className="text-xl font-semibold text-red-600">Appointment History</h2>
            <p className="text-3xl font-bold text-red-600">{appointmentHistory}</p>
          </div>

          <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-red-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
            <h2 className="text-xl font-semibold text-red-600">Total Patients</h2>
            <p className="text-3xl font-bold text-red-600">{totalPatients}</p>
          </div>
        </div>

        {/* Patient Table */}
        <div className="overflow-x-auto mt-6">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Patient List</h2>
          {patients.length === 0 ? (
            <div className="text-center text-gray-400">No patients found.</div>
          ) : (
            <table className="min-w-full table-auto text-left border-collapse">
              <thead>
                <tr className="bg-red-100">
                  <th className="p-4 text-sm font-medium text-red-600 border-b">Patient Name</th>
                  <th className="p-4 text-sm font-medium text-red-600 border-b">Email</th>
                  <th className="p-4 text-sm font-medium text-red-600 border-b">Date of Birth</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={index} className="border-b hover:bg-red-50">
                    <td className="p-4 text-sm text-gray-800">{patient.name}</td>
                    <td className="p-4 text-sm text-gray-800">{patient.email}</td>
                    <td className="p-4 text-sm text-gray-800">{patient.dob || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;
