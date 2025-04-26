import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
  const userId = localStorage.getItem('userId'); // Get user ID from local storage
  const doctorId = userId; // Assuming the user ID is the same as the doctor ID
  // State for the counts and loading status
  const [totalPatients, setTotalPatients] = useState(0);
  const [appointmentsToday, setAppointmentsToday] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState(0);
  const [appointmentHistory, setAppointmentHistory] = useState(0);
  const [loading, setLoading] = useState(true);

  // Function to fetch the data
  const fetchData = async () => {
    try {

      // Get total number of patients (you can get this from your backend as well)
      
      const totalPatientsResponse = await axios.get(`/api/appointments/${doctorId}/totalPatients`);
      setTotalPatients(totalPatientsResponse.data.count); // Set total patients count

      // Get past appointments history
      const pastAppointmentsResponse = await axios.get(`/api/appointments/doctor/${doctorId}/past`);
      setAppointmentHistory(pastAppointmentsResponse.data.length); // Set appointment history count


      // Get upcoming appointments count
      const upcomingAppointmentsResponse = await axios.get(`/api/appointments/doctor/${doctorId}/upcoming`);
      const upcomingAppointmentsData = upcomingAppointmentsResponse.data;

      // Get today's date
      const today = new Date().toISOString().slice(0, 10); // Get only the date part (YYYY-MM-DD)

      // Filter today's appointments from the upcoming appointments data
      const todayAppointments = upcomingAppointmentsData.filter(appt => {
        const appointmentDate = new Date(appt.appointmentTime).toISOString().slice(0, 10);
        return appointmentDate === today;
      });

      setAppointmentsToday(todayAppointments.length); // Set today's appointments count
      setUpcomingAppointments(upcomingAppointmentsData.length); // Set upcoming appointments count



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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Dashboard Content */}
      <div className="bg-white p-8 shadow-lg rounded-lg text-center w-11/12 max-w-2xl">
        <h1 className="text-3xl font-semibold text-red-600 mb-6">Doctor Dashboard</h1>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-50 p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-800">Total Patients</h2>
            <p className="text-2xl font-bold text-red-600">{totalPatients}</p>
          </div>

          {/* Upcoming Appointments Section */}
          <div className="flex justify-between bg-gray-50 p-4 rounded shadow">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
              <p className="text-2xl font-bold text-red-600">{upcomingAppointments}</p>
            </div>

            {/* Today's Appointments Section */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">Today's Appointments</h2>
              <p className="text-2xl font-bold text-red-600">{appointmentsToday}</p>
            </div>
          </div>

          {/* Appointment History Section */}
          <div className="bg-gray-50 p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-800">Appointment History</h2>
            <p className="text-2xl font-bold text-red-600">{appointmentHistory}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
