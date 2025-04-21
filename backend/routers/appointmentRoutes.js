const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

// Create appointment
router.post("/", appointmentController.createAppointment);

// Get all appointments for a user
router.get("/user/:userId", appointmentController.getAppointmentsByUser);

// Get all appointments for a doctor
router.get("/doctor/:doctorId", appointmentController.getAppointmentsByDoctor);

// Update appointment status
router.put("/:appointmentId/status", appointmentController.updateAppointmentStatus);

module.exports = router;
