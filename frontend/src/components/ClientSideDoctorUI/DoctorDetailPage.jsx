import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppointmentForm from "./AppointmentForm";
import FeedbackSection from "./FeedbackSection";
import DoctorAIChatbot from "./DoctorAIChatbot";
import MyImage from "../../images/abc.webp";
import axios from "axios";


//utility functions to calculate slot time and format time
import { calculateSlotTime,formatTime12Hour } from "../Services/services1"; // Assuming 
import AppointmentSection from "./DoctorSectionUserSide/AppointmentSection";
import { DoctorPersonalInfo } from "./DoctorSectionUserSide/DoctorPersonalInfo";
import SlotTable from "./Slot/SlotTable";


const DoctorDetailPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [showForm, setShowForm] = useState(false);

  const [selectedSlots, setSelectedSlots] = useState([]); // For storing selected slots{Slottbale} => object{Name,Slot, time, date}
  // console.log(selectedSlots);
  
  const userId = localStorage.getItem("userId");


  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`/api/doctor/${id}`);
        setDoctor(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching doctor:", err);
        setLoading(false);
      }
    };

    fetchDoctor();
    setLoading(true);
    const fetchselectedSlots = async () => {
      try {
        const res = await axios.get(`/api/appointments/doctor/${id}/upcoming`);
        setSelectedSlots(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching selected slots:", err);
        setLoading(false);
      }
    };
    fetchselectedSlots();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (!doctor) return <p className="text-center mt-10 text-gray-600">Doctor not found.</p>;

  const estimatedTime = (doctor.currentQueue + 1) * doctor.timePerPatient;

  return (
    <div className="min-h-screen bg-red-50 py-10 px-4">
      
      <div className="max-w-6xl mx-auto ">
 
        {/* Left + Middle Section */}
        <div className="md:col-span-2 bg-white p-6 rounded shadow-md border-l-4 border-red-500">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-red-700">{doctor.name}</h2>
              <p className="text-gray-700 font-medium">{doctor.specialization}</p>
            </div>

            <div className="flex flex-col items-end">
              <img
                src={MyImage}
                alt={doctor.name}
                className="w-20 h-20 object-cover rounded-full border-2 border-red-400 mb-2"
              />
              <p className="text-sm text-gray-600">
                ⭐ <span className="text-lg font-semibold text-black">{doctor.rating}</span>
              </p>
            </div>
          </div>
          {/* Show Location */}
          <div className="mb-4 flex justify-end">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                doctor.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-red-700 hover:underline hover:text-red-800"
            >
              📍 Show on Google Maps
            </a>
          </div>

          {/* Personal Info */}
          <DoctorPersonalInfo doctor={doctor} />
          


          {/* Appointment Info Section */}
          <AppointmentSection doctor={doctor} />


          <div className="bg-white p-6 rounded shadow-md border border-red-300 mb-6">
             
            {/* Queue */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                Queue: {doctor.currentQueue}
              </div>
            </div>

            {/* Slot Time Estimation */}
            <div className="text-center">
              <p className="text-red-700 font-semibold text-lg">
                Your Slot No: {doctor.currentQueue + 1}
              </p>
              <p className="text-gray-700 text-sm mt-1">
                Estimated Time: {calculateSlotTime(doctor.startTime, doctor.interval, doctor.currentQueue)}
              </p>
            </div>

          </div>


         {/* Slot Booking */}    {/* Appointment Button */}
         <SlotTable
            selectedSlots={selectedSlots}
            setSelectedSlots={setSelectedSlots}
            doctorId={id}
            doctor={doctor}
          />
       
        

          {/* Feedback Section */}
          <div className="mt-6">
            <FeedbackSection feedback={doctor.feedback || []} />
          </div>
        </div>

        {/* Chatbot */}
        <div className="col-span-1 h-[410px] overflow-y-auto my-4">
          <DoctorAIChatbot />
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailPage;
