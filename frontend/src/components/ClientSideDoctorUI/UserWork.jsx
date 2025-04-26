import React from 'react';
import { Link } from 'react-router-dom';

const UserWork = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white overflow-hidden">
      
      {/* Background Plus Sign */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="text-blue-200 text-[400px] font-bold opacity-10 select-none pointer-events-none">
          +
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Header */}
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Welcome to Doctor-Patient Portal
        </h1>

        {/* Animation Section */}
        <div className="relative flex items-center justify-center w-full h-64">
          {/* Doctor Circle */}
          <div className="w-32 h-32 bg-green-500 rounded-full animate-bounce mx-4 flex items-center justify-center shadow-lg">
            <span className="text-white font-semibold">Doctor</span>
          </div>

          {/* Patient Circle */}
          <div className="w-32 h-32 bg-red-500 rounded-full animate-bounce mx-4 flex items-center justify-center shadow-lg">
            <span className="text-white font-semibold">Patient</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6">
          <Link
            to="/user/profile"
            className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            View Profile
          </Link>

          <Link
            to="/user/current"
            className="px-8 py-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
          >
            Book Appointment
          </Link>

          <Link
            to="/user/history"
            className="px-8 py-4 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition-all duration-300"
          >
            Appointment History
          </Link>
        </div>

        {/* Footer Message */}
        <p className="mt-8 text-lg text-gray-600 animate-pulse">
          Connecting Doctors and Patients Seamlessly...
        </p>
      </div>
    </div>
  );
};

export default UserWork;
