const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

// ✅ Create appointment (only within allowed date range)
router.post("/create", appointmentController.createAppointment);

// ✅ Get past appointments for a user (dates before today)
router.get("/user/:userId/past", appointmentController.getPastAppointmentsByUser);

// ✅ Get upcoming appointments for a user (today or future)
router.get("/user/:userId/upcoming", appointmentController.getUpcomingAppointmentsByUser);

//Get past 
router.get("/doctor/:doctorId/past", appointmentController.getPastAppointmentsByDoctor);

router.get("/doctor/:doctorId/upcoming", appointmentController.getUpcomingAppointmentsByDoctor);
// ✅ Delete appointments (by user or doctor, only for today or past dates)
router.delete("/:appointmentId", appointmentController.deleteAppointment);

// ✅ Update appointment status (only by doctor and only if today)
router.put("/:appointmentId/status", appointmentController.updateAppointmentStatus);

// ❌ Disabled: Get all appointments for a doctor
// router.get("/doctor/:doctorId", appointmentController.getAppointmentsByDoctor);

// Route to get total patients for a specific doctor
router.get("/:doctorId/totalPatients", appointmentController.getTotalPatientsByDoctor);

// Route to get unique patients for a specific doctor
router.get("/doctor/:doctorId/unique-patients", appointmentController.getUniquePatientsByDoctor);

module.exports = router;
