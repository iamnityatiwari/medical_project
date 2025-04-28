import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserWork = () => {
  const [pastCount, setPastCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);

  const userId = localStorage.getItem("userId"); // 🛑 Adjust this based on how you're storing user info

  useEffect(() => {
    if (userId) {
      fetchAppointmentCounts();
    }
  }, [userId]);

  const fetchAppointmentCounts = async () => {
    try {
      // Fetch past appointments
      const pastRes = await axios.get(`/api/appointments/user/${userId}/past`);
      setPastCount(pastRes.data.length);

      // Fetch upcoming appointments
      const upcomingRes = await axios.get(`/api/appointments/user/${userId}/upcoming`);
      setUpcomingCount(upcomingRes.data.length);

    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-50 to-white overflow-hidden">

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">

        {/* Appointment Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 w-full max-w-2xl px-6">

          {/* Upcoming Appointments Card */}
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-red-200">
            <div className="text-5xl font-bold text-red-500">{upcomingCount}</div>
            <div className="mt-2 text-xl font-semibold text-gray-700">Upcoming Appointments</div>
          </div>

          {/* Past Appointments Card */}
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-red-200">
            <div className="text-5xl font-bold text-gray-500">{pastCount}</div>
            <div className="mt-2 text-xl font-semibold text-gray-700">Past Appointments</div>
          </div>

        </div>


        {/* Action Sections */}
        <div className="mt-10 grid grid-cols-1 gap-8 w-full px-6">

          {/* Doctor List Section */}
          <div className="group relative flex items-center justify-center h-48 rounded-2xl bg-white cursor-pointer hover:bg-red-100 border border-red-200 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="text-red-600 text-2xl font-semibold group-hover:text-red-700">
              Doctor List
            </div>
            <Link to="/user/doctors" className="absolute inset-0"></Link>
          </div>

          {/* Blood Bank Section */}
          <div className="group relative flex items-center justify-center h-48 rounded-2xl bg-white cursor-pointer hover:bg-red-100 border border-red-200 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="text-red-600 text-2xl font-semibold group-hover:text-red-700">
              Blood Bank
            </div>
            <Link to="/user/blood-bank" className="absolute inset-0"></Link>
          </div>

          {/* Medicine Store Section */}
          <div className="group relative flex items-center justify-center h-48 rounded-2xl bg-white cursor-pointer hover:bg-red-100 border border-red-200 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="text-red-600 text-2xl font-semibold group-hover:text-red-700">
              Medicine Store
            </div>
            <Link to="/user/medicine-store" className="absolute inset-0"></Link>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          <Link
            to="/user/profile"
            className="px-8 py-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
          >
            View Profile
          </Link>

          <Link
            to="/user/current"
            className="px-8 py-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
          >
            Current Appointments
          </Link>

          <Link
            to="/user/history"
            className="px-8 py-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
          >
            Appointments History
          </Link>
        </div>

      </div>
    </div>
  );
};

export default UserWork;
