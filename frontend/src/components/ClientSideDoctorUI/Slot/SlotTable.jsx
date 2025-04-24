import React, { useState, useEffect } from "react";
import { generateSlots } from "./Slotutils";
import { SlotBookingFrom } from "./SlotBookingFrom";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { formatTime12Hour } from "../../Services/services1";
import {useNotification} from "../../../store/NotificationContext";

const SlotTable = ({ selectedSlots, setSelectedSlots, doctorId , doctor}) => {
  const navigate = useNavigate(); //use for navigation

  const { showNotification } = useNotification(); //use for notification

  const [selectedDate, setSelectedDate] = useState("");
  const currentUserId = localStorage.getItem("userId");
  const [activeSlotForm, setActiveSlotForm] = useState(null); // For showing the form
  
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: user.name || "",
    age: user.age || "",
    description: "",
  });
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        setUser(res.data);
        const { name, age } = res.data;
        setFormData({name: name || "", age: age || "", description: ""});
        // console.log("User data:", res.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUser();
  }, [userId]);

  

  const today = new Date();
  const todayStr = today.toLocaleDateString("en-CA"); // '2025-04-23' in local time
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 7);
  const sevenDaysLaterStr = sevenDaysLater.toLocaleDateString("en-CA");



  useEffect(() => {
    setSelectedDate(todayStr);
  }, []);

  const handleSlotClick = (slot) => {
    setActiveSlotForm(slot === activeSlotForm ? null : slot);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmBooking = async () => {
    if (!formData.name || !formData.age) return;



    const newAppointment = {
      doctorId,
      date: selectedDate,
      slot: activeSlotForm,
      time: activeSlotForm,
      selected: true,
      ...formData,
    };

    try {
      const payload = {
        userId: localStorage.getItem("userId"),
        ...newAppointment
      };
      console.log("📦 Payload for booking:", payload);
      const res = await axios.post("/api/appointments/create", payload);
      console.log("✅ Appointment booked:", res.data);
      showNotification("Appointment booked successfully!", "success");
      // alert("Appointment successfully booked.");
      setSelectedSlots((prev) => [
        ...prev,
        newAppointment,
      ]);
      navigate("/user/current"); // Redirect to appointments page after booking
    } catch (err) {
      console.error("❌ Error booking appointment:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Something went wrong!");
      navigate("/user/doctors"); // Redirect to appointments page after booking
    }




    setActiveSlotForm(null);
    setFormData({ name: user.name || "",
      age: user.age || "", description: "" });
  };
  const START_TIME = doctor.startTime; // "4:00"
  const END_TIME = doctor.endTime; // "11:00"
  const INTERVAL = doctor.interval; // 20 minutes
  const BREAK_START = doctor.breakStart; // "7:00"
  const BREAK_END = doctor.breakEnd; // "7:40"
  const slots = generateSlots(START_TIME, END_TIME, INTERVAL, BREAK_START, BREAK_END); // doctor's time slots backend fetch karna hai
  // console.log(selectedSlots);
  return (
    <div className="bg-white  rounded-2xl shadow-md border border-red-300  ">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Choose Your Slot</h1>

        <label className="block mb-2 text-sm font-medium text-gray-700">Select a Date:</label>
        <input
          type="date"
          className="mb-6 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none border-red-500 text-red-500"
          value={selectedDate}
          min={todayStr}
          max={sevenDaysLaterStr}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Time Slots for {selectedDate}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {slots.map((slot, idx) => {
              const [slotLeft, slotRight] = slot.split(" -");
              const bookedSlot = selectedSlots.find(
                (item) =>
                  item.slot === slot &&
                  item.date === selectedDate &&
                  item.doctorId === doctorId
              );

              const isBooked = !!bookedSlot;
              const bookedByUser = bookedSlot?.userId;
              const showHoverText = !isBooked && activeSlotForm !== slot;

              return (
                <div key={idx} className="relative group">
                  <div
                    onClick={() => !isBooked && handleSlotClick(slot)}
                    className={`px-4 py-2 rounded-lg text-center cursor-pointer transition-colors duration-200 border relative
            ${isBooked
                        ? bookedByUser === currentUserId
                          ? "bg-green-500 text-white border-green-600 cursor-not-allowed"
                          : "bg-red-500 text-white border-red-600 cursor-not-allowed"
                        : "bg-white hover:bg-red-100 text-gray-800 border-gray-300"
                      }`}
                  >
                    {/* Time or Booking Status */}
                    <span
                      className={`${!isBooked
                          ? "group-hover:opacity-0 transition-opacity duration-200"
                          : ""
                        }`}
                    >
                      {isBooked
                        ? bookedByUser === currentUserId
                          ? "You Booked"
                          : "Booked"
                        :formatTime12Hour(slotLeft) + " - "  + formatTime12Hour(slotRight)}
                    </span>

                    {/* Hover "Book Now" only for available slots */}
                    {!isBooked && (
                      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-red-600 font-semibold transition-opacity duration-200">
                        Book Now
                      </span>
                    )}
                  </div>

                  {/* Slot Booking Modal */}
                  {activeSlotForm === slot && !isBooked && (
                    <SlotBookingFrom
                      setActiveSlotForm={setActiveSlotForm}
                      selectedDate={selectedDate}
                      activeSlotForm={activeSlotForm}
                      formData={formData}
                      handleInputChange={handleInputChange}
                      handleConfirmBooking={handleConfirmBooking}
                    />
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {selectedSlots.length > 0 && (
          <div className="mt-6">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              Selected Slots:
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {selectedSlots.map((item, index) => (
                (item.userId === currentUserId && <li key={index}>
                  {item.date} - {item.slot} | {item.name} | Age: {item.age}
                </li>)
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotTable;
