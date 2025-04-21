const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Doctor = require("../models/doctorModel");

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, userId, appointmentTime, symptoms } = req.body;

    if (!doctorId || !userId || !appointmentTime) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // 🔍 Check if doctor exists
    const doctorExists = await Doctor.findById(doctorId);
    if (!doctorExists) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    // 🔍 Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    // ❌ Prevent double booking at the same time for the same doctor
    const exists = await Appointment.findOne({ doctor: doctorId, appointmentTime });
    if (exists) {
      return res.status(400).json({ message: "This time slot is already booked." });
    }

    // ✅ Create and save the appointment
    const newAppointment = new Appointment({
      doctor: doctorId,
      user: userId,
      appointmentTime,
      symptoms,
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(500).json({ message: "Failed to create appointment." });
  }
};


// Get all appointments for a specific user
exports.getAppointmentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const appointments = await Appointment.find({ user: userId })
      .populate("doctor", "name specialization clinic")
      .sort({ appointmentTime: 1 });

    res.json(appointments);
  } catch (err) {
    console.error("Error getting user appointments:", err);
    res.status(500).json({ message: "Failed to get appointments." });
  }
};

// Get all appointments for a specific doctor
exports.getAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("user", "name email")
      .sort({ appointmentTime: 1 });

    res.json(appointments);
  } catch (err) {
    console.error("Error getting doctor appointments:", err);
    res.status(500).json({ message: "Failed to get doctor appointments." });
  }
};

// Update appointment status (Pending, Confirmed, Completed, Cancelled)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    res.json(updatedAppointment);
  } catch (err) {
    console.error("Error updating appointment status:", err);
    res.status(500).json({ message: "Failed to update appointment status." });
  }
};
