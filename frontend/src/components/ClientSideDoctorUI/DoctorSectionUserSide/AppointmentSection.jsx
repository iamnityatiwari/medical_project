import React from 'react';
import { formatTime12Hour } from '../../Services/services1';

const AppointmentSection = ({ doctor }) => {
  const [showWeeklySchedule, setShowWeeklySchedule] = React.useState(false);

  // Inside AppointmentSection component
  const todayDate = new Date();
  const formattedDate = `${String(todayDate.getDate()).padStart(2, '0')}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${todayDate.getFullYear()}`;


  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }); // e.g., "Monday"

  const weeklySchedule = [
    { day: 'Monday', start: doctor.startTime, end: doctor.endTime },
    { day: 'Tuesday', start: doctor.startTime, end: doctor.endTime },
    { day: 'Wednesday', start: doctor.startTime, end: doctor.endTime },
    { day: 'Thursday', start: doctor.startTime, end: doctor.endTime },
    { day: 'Friday', start: doctor.startTime, end: doctor.endTime },
    { day: 'Saturday', start: doctor.startTime, end: doctor.endTime },
    { day: 'Sunday', start: null, end: null }, // closed
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-red-300 mb-6">
      <h3 className="text-lg font-semibold text-red-600 mb-6">Appointment Info</h3>

      <div className="grid gap-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-700 font-medium">Fee:</span>
          <span className="text-black font-semibold">₹{doctor.fee}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700 font-medium">Interval (per patient):</span>
          <span className="text-black font-semibold">{doctor.interval} min</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700 font-medium">Start Time:</span>
          <span className="text-black font-semibold">{formatTime12Hour(doctor.startTime)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700 font-medium">End Time:</span>
          <span className="text-black font-semibold">{formatTime12Hour(doctor.endTime)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700 font-medium">Break:</span>
          <span className="text-black font-semibold">
            {formatTime12Hour(doctor.breakStart)} - {formatTime12Hour(doctor.breakEnd)}
          </span>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 mb-4"
        onClick={() => setShowWeeklySchedule(!showWeeklySchedule)}
      >
        {showWeeklySchedule ? 'Cancel' : 'Show Time Table'}
      </button>

      {/* Conditional Weekly Schedule */}
      {showWeeklySchedule && (
        <>
          <h4 className="text-md font-semibold text-red-500 mb-3">Weekly Schedule</h4>
          <div className="space-y-2">
          {weeklySchedule.map(({ day, start, end }) => {
          
            const isToday = today === day;
            


            return (
                <div
                key={day}
                className={`flex justify-between border-b border-gray-200 pb-1 ${
                    isToday ? 'bg-yellow-100 rounded px-2' : ''
                }`}
                >
                <span className="text-gray-700 font-medium">
                    {day} {isToday && <span className="text-sm text-red-500">(Today)<span className='px-6 text-green-600'>{formattedDate}</span></span>}
                </span>
                <span className="text-black font-semibold">
                    {start && end ? `${formatTime12Hour(start)} - ${formatTime12Hour(end)}` : 'Closed'}
                </span>
                </div>
            );
           })}
          </div>
        </>
      )}
      

    </div>
  );
};

export default AppointmentSection;
