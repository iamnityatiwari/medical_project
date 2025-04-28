import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const HistoryAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [searchDoctor, setSearchDoctor] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPastAppointments = async () => {
      try {
        const res = await axios.get(`/api/appointments/user/${userId}/past`);
        const pastAppointments = res.data.filter((appt) =>
          moment(appt.date).isBefore(moment(), "day")
        );
        setAppointments(pastAppointments);
        setFilteredAppointments(pastAppointments);
      } catch (error) {
        console.error("Error fetching past appointments:", error);
      }
    };
    fetchPastAppointments();
  }, [userId]);

  useEffect(() => {
    let filtered = [...appointments];

    if (searchDate) {
      filtered = filtered.filter((appt) =>
        moment(appt.date).isSame(searchDate, "day")
      );
    }

    if (searchDoctor) {
      filtered = filtered.filter((appt) =>
        appt.doctor?.name.toLowerCase().includes(searchDoctor.toLowerCase())
      );
    }

    setFilteredAppointments(filtered);
  }, [searchDate, searchDoctor, appointments]);

  const groupedAppointments = filteredAppointments.reduce((acc, appt) => {
    const dateKey = moment(appt.date).format("MMMM D, YYYY");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(appt);
    return acc;
  }, {});

  const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

  // Mouse movement tilt effect handler
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX; // Range: -1 to 1
    const deltaY = (y - centerY) / centerY; // Range: -1 to 1

    const rotateX = deltaY * 10; // Max tilt angle on the X-axis
    const rotateY = -deltaX * 10; // Max tilt angle on the Y-axis

    // Apply the rotation to the card
    card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = (e) => {
    // Reset the tilt back to normal when the mouse leaves the card
    e.currentTarget.style.transform = "perspective(500px) rotateX(0) rotateY(0)";
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-red-50 to-white px-6 py-10">
      <h1 className="text-4xl font-extrabold text-red-600 mb-10 text-center drop-shadow-md">
        🗓️ Your Appointment History
      </h1>

      {/* Search Filters */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-12 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          
          {/* Date Search */}
          <div className="w-full">
            <label className="block mb-2 text-gray-700 font-semibold">Select Date</label>
            <input
              type="date"
              value={searchDate}
              max={yesterday} // Only allow past dates
              onChange={(e) => setSearchDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          {/* Doctor Name Search */}
          <div className="w-full">
            <label className="block mb-2 text-gray-700 font-semibold">Doctor's Name</label>
            <input
              type="text"
              placeholder="Search doctor name..."
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>
        </div>
      </div>

      {/* Appointments */}
      {filteredAppointments.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-20">No appointments found.</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-10">
          {Object.entries(groupedAppointments).map(([dateLabel, appts]) => (
            <div key={dateLabel}>
              <h2 className="text-2xl font-bold text-red-500 mb-6 border-b-2 border-red-300 pb-2">
                {dateLabel}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {appts.map((appt, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={resetTilt} // Reset tilt on mouse leave
                  >
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-lg font-semibold text-gray-800">
                        Slot: <span className="text-red-600">{appt.slot}</span>
                      </p>
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold capitalize">
                        {appt.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold text-red-600 text-lg">
                        🩺 Dr. {appt.doctor?.name}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        ({appt.doctor?.specialization})
                      </p>
                      <p className="text-sm text-gray-600">
                        🏥 Clinic: {appt.doctor?.clinic}
                      </p>
                      <p className="text-sm text-gray-600">
                        🙍 Patient: <span className="font-medium">{appt.name}</span> (Age: {appt.age})
                      </p>
                      {appt.description && (
                        <p className="text-sm text-gray-600">
                          📝 Reason: {appt.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryAppointment;
