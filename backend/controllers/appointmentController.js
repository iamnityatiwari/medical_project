const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Doctor = require("../models/doctorModel");

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, userId, name, age, slot, date, description, selected } = req.body;
    
    if (!doctorId || !userId || !name || !age || !slot || !date) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }
    const appointmentTime = new Date(date);
    console.log("Appointment time:", appointmentTime);

    // ⏳ Date validation (Only allow within today to next 7 days)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight
    const selectedDate = new Date(date);
  
    selectedDate.setHours(0, 0, 0, 0); // Just comparing date, not time
  
    const maxAllowedDate = new Date(today);
    maxAllowedDate.setDate(today.getDate() + 7);

  
    if (selectedDate < today) {
      return res.status(400).json({ message: "Cannot book for past dates." });
    }
    console.log("Selected date is valid.");
    if (selectedDate > maxAllowedDate) {
      return res.status(400).json({ message: "Appointments can only be booked up to 7 days in advance." });
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
    const exists = await Appointment.findOne({ doctor: doctorId, date, slot });
    if (exists) {
      return res.status(400).json({ message: "This time slot is already booked." });
    }

    // ✅ Create and save the appointment
    const newAppointment = new Appointment({
      doctor: doctorId,
      user: userId,
      name,
      age,
      slot,
      date,
      appointmentTime,
      description,
      selected,
      status: "Pending",
    });
    console.log("New appointment object:", newAppointment);
    const savedAppointment = await newAppointment.save();
    console.log("Appointment created:", savedAppointment);
    res.status(201).json(savedAppointment);
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(500).json({ message: "Failed to create appointment." });
  }
};



// Get all appointments for a specific user
// Get past appointments for a specific user
exports.getPastAppointmentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // set to start of today

    const pastAppointments = await Appointment.find({
      user: userId,
      appointmentTime: { $lt: today },
    })
      .populate("doctor", "name specialization clinic")
      .sort({ appointmentTime: -1 });
    console.log("Past appointments:", pastAppointments);

    res.json(pastAppointments);
  } catch (err) {
    console.error("Error getting past appointments:", err);
    res.status(500).json({ message: "Failed to get past appointments." });
  }
};

// Get upcoming appointments for a specific user
exports.getUpcomingAppointmentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today's date (local)

    const upcomingAppointments = await Appointment.find({
      user: userId,
      appointmentTime: { $gte: today },
    }).sort({ appointmentTime: 1 });

    // Map results to the format you want
    const formattedAppointments = upcomingAppointments.map((appt) => ({
      _id: appt._id,
      doctorId: appt.doctor,
      userId: appt.user,
      appointmentTime: appt.appointmentTime,
      slot: appt.slot,
      date: appt.date,
      name: appt.name,
      age: appt.age,
      description: appt.description,
      status: appt.status,
    }));

    // console.log("Upcoming formatted appointments:", formattedAppointments);
    res.json(formattedAppointments);
  } catch (err) {
    console.error("Error getting upcoming appointments:", err);
    res.status(500).json({ message: "Failed to get upcoming appointments." });
  }
};



// Get all appointments for a specific doctor
// Get past appointments for a specific doctor
exports.getPastAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // set to start of today

    const pastAppointments = await Appointment.find({
      doctor: doctorId,
      appointmentTime: { $lt: today },
    })
      .populate("user", "name email")
      .sort({ appointmentTime: -1 });

    res.json(pastAppointments);
  } catch (err) {
    console.error("Error getting past doctor appointments:", err);
    res.status(500).json({ message: "Failed to get past doctor appointments." });
  }
};

// Get upcoming appointments for a specific doctor
exports.getUpcomingAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    // console.log("Doctor ID:", doctorId);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set to start of today

    const upcomingAppointments = await Appointment.find({
      doctor: doctorId,
      appointmentTime: { $gte: today },
    }).populate("user", "name email")
      .populate("doctor", "name")
      .sort({ appointmentTime: 1 });
     
      const formattedAppointments = upcomingAppointments.map((appt) => ({
        _id: appt._id,
        doctor: appt.doctor,
        user: appt.user,
        doctorId: appt.doctor._id,
        userId: appt.user._id,
        appointmentTime: appt.appointmentTime,
        slot: appt.slot,
        date: appt.date,
        name: appt.name,
        age: appt.age,
        description: appt.description,
        status: appt.status,
      }));
    
    res.json(formattedAppointments);
  } catch (err) {
    console.error("Error getting upcoming doctor appointments:", err);
    res.status(500).json({ message: "Failed to get upcoming doctor appointments." });
  }
};


// Update appointment status (Pending, Confirmed, Completed, Cancelled)
// Update appointment status ONLY if it's for today AND by the doctor who owns it
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status, doctorId } = req.body; // doctorId must be passed in request body

    const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    // 🔐 Check if this doctor owns the appointment
    if (appointment.doctor.toString() !== doctorId) {
      return res.status(403).json({ message: "You are not authorized to update this appointment." });
    }

    // ⏰ Check if appointment date is today
    const appointmentDate = new Date(appointment.appointmentTime);
    const today = new Date();
    const isSameDate =
      appointmentDate.getDate() === today.getDate() &&
      appointmentDate.getMonth() === today.getMonth() &&
      appointmentDate.getFullYear() === today.getFullYear();

    if (!isSameDate) {
      return res.status(400).json({
        message: "Appointment status can only be updated on the same day of the appointment.",
      });
    }

    // ✅ Update status
    appointment.status = status;
    const updatedAppointment = await appointment.save();

    res.json(updatedAppointment);
  } catch (err) {
    console.error("Error updating appointment status:", err);
    res.status(500).json({ message: "Failed to update appointment status." });
  }
};



// Delete appointment only if it's today or a past date
exports.deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    // 🗓️ Check if appointment date is today or earlier
    const appointmentDate = new Date(appointment.appointmentTime);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to midnight
    appointmentDate.setHours(0, 0, 0, 0); // normalize

    if (appointmentDate > today) {
      return res.status(400).json({ message: "Future appointments cannot be deleted." });
    }

    // ✅ Delete the appointment
    await Appointment.findByIdAndDelete(appointmentId);
    res.json({ message: "Appointment deleted successfully." });
  } catch (err) {
    console.error("Error deleting appointment:", err);
    res.status(500).json({ message: "Failed to delete appointment." });
  }
};

