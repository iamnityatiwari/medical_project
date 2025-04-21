import React from 'react';

const DoctorDashboard = () => {
  // Example data (replace with actual data from API or state)
  const totalPatients = 120; // Total number of patients
  const appointmentsToday = 8; // Appointments scheduled for today
  const appointmentHistory = 350; // Total past appointments

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
          <div className="bg-gray-50 p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-800">Appointments Today</h2>
            <p className="text-2xl font-bold text-red-600">{appointmentsToday}</p>
          </div>
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
