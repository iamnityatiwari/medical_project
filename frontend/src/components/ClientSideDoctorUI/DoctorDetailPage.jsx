import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppointmentForm from "./AppointmentForm";
import FeedbackSection from "./FeedbackSection";
import DoctorAIChatbot from "./DoctorAIChatbot";
import MyImage from "../../images/abc.webp";
import axios from "axios";
import { FaComments } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // 🆕 Animation added

// utility functions
import { calculateSlotTime, formatTime12Hour } from "../Services/services1";
import AppointmentSection from "./DoctorSectionUserSide/AppointmentSection";
import { DoctorPersonalInfo } from "./DoctorSectionUserSide/DoctorPersonalInfo";
import SlotTable from "./Slot/SlotTable";

const DoctorDetailPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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

    const fetchSelectedSlots = async () => {
      try {
        const res = await axios.get(`/api/appointments/doctor/${id}/upcoming`);
        setSelectedSlots(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching selected slots:", err);
        setLoading(false);
      }
    };

    fetchDoctor();
    fetchSelectedSlots();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (!doctor) return <p className="text-center mt-10 text-gray-600">Doctor not found.</p>;

  const estimatedTime = (doctor.currentQueue + 1) * doctor.timePerPatient;

  return (
    <div className="min-h-screen bg-red-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Doctor Info Section */}
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
                ⭐ <span className="text-lg font-semibold text-black"> {doctor.rating ? doctor.rating.toFixed(1) : "0.0"}</span>
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="mb-4 flex justify-end">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doctor.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-red-700 hover:underline hover:text-red-800"
            >
              📍 Show on Google Maps
            </a>
          </div>

          {/* Personal Info */}
          <DoctorPersonalInfo doctor={doctor} />

          {/* Appointment Info */}
          <AppointmentSection doctor={doctor} />

          {/* Slot Booking Section */}
          <SlotTable
            selectedSlots={selectedSlots}
            setSelectedSlots={setSelectedSlots}
            doctorId={id}
            doctor={doctor}
          />

          {/* Feedback */}
          <div className="mt-6">
            <FeedbackSection feedback={doctor.feedback || []} />
          </div>
        </div>
      </div>

      {/* Floating Chatbot Button */}
      <button 
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg z-50 transition-transform transform hover:scale-105"
      >
        <FaComments size={24} />
      </button>

      {/* Animated Chatbot Box */}
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-4 w-11/12 md:w-96 h-[400px] bg-white rounded-lg shadow-lg border border-red-300 p-4 z-40 overflow-hidden"
          >
            <DoctorAIChatbot doctorId={id} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorDetailPage;
