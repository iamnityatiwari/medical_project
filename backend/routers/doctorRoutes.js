const express = require("express");
const router = express.Router();
const {
  registerDoctor,
  loginDoctor,
  getDoctorProfile,
  setDoctorProfile,
  updateDoctorProfile,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
} = require("../controllers/doctorController");

// Register & Login
router.post("/register", registerDoctor);        // POST /api/doctor/register
router.post("/login", loginDoctor);              // POST /api/doctor/login

// Profile based on email
router.get("/profile", getDoctorProfile);        // GET /api/doctor/profile?email=
router.post("/profile", setDoctorProfile);       // POST /api/doctor/profile
router.put("/profile", updateDoctorProfile);     // PUT /api/doctor/profile

// CRUD with ID
router.get("/", getAllDoctors);                  // GET /api/doctor
router.get("/:id", getDoctorById);               // GET /api/doctor/:id
router.put("/:id", updateDoctorById);            // PUT /api/doctor/:id

module.exports = router;
