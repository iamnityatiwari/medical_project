import React from 'react';

const UserWork = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-white">
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

      {/* Footer Message */}
      <p className="mt-8 text-lg text-gray-600 animate-pulse">
        Connecting Doctors and Patients Seamlessly...
      </p>
    </div>
  );
};

export default UserWork;