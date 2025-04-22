const Doctor = require("../models/doctorModel");
const bcrypt = require('bcrypt');


// 🔐 Register Doctor
const registerDoctor = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if doctor already exists by email
    const existing = await Doctor.findOne({ email });
    if (existing) return res.status(400).json({ message: "Doctor already exists" });

    // Create and save new doctor (pre-save will hash the password)
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();

    // Return success
    res.status(201).json({ message: "Doctor registered successfully", user: newDoctor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



// 🔐 Login Doctor (enhanced version)
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🟡 Logging in doctor with:", req.body);

    // 👨‍⚕️ Find doctor and include password
    const doctor = await Doctor.findOne({ email }).select('+password');
    if (!doctor) {
      console.log("🔴 Doctor not found");
      return res.status(404).json({ message: "Doctor not found" });
    }

    // 🔑 Compare password
    const isMatch = await doctor.comparePassword(password);
    if (!isMatch) {
      console.log("🔴 Invalid password");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🟢 Login successful
    console.log("🟢 Doctor logged in successfully");
    
    // Remove password before sending response
    const { password: _, ...doctorData } = doctor.toObject();

    res.status(200).json({
      message: "Login successful",
      user: doctorData
    });

  } catch (error) {
    console.error("🔥 Login error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



// ✅ Get Doctor Profile by Email (GET /profile?email=)
const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ email: req.query.email });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Create Profile (POST /profile)
const setDoctorProfile = async (req, res) => {
  try {
    const existing = await Doctor.findOne({ email: req.body.email });
    if (existing) return res.status(400).json({ message: "Doctor already exists" });

    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Update Profile by Email (PUT /profile)
const updateDoctorProfile = async (req, res) => {
  try {
    const { email } = req.body;

    // If password is present, hash it before update
    /* 
        if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
    }
    */
   

    const updatedDoctor = await Doctor.findOneAndUpdate({ email }, req.body, { new: true });
    if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// ✅ Get All Doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get Doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Update Doctor by ID
const updateDoctorById = async (req, res) => {
  try {
    const { password } = req.body;

    // If password is present, hash it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
    }

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = {
  registerDoctor,
  loginDoctor,
  getDoctorProfile,
  setDoctorProfile,
  updateDoctorProfile,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
};
