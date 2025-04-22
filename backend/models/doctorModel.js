const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  experience: {
    type: String,
  },
  education: {
    type: String,
  },
  clinic: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  rating: {
    type: Number,
    default: 4.5, // You can adjust default as needed
  },
  location: {
    type: String,
  },
  fee: {
    type: Number,
    default: 300,
  },
  patientsPerDay: {
    type: Number,
    default: 10,
  },
  timePerPatient: {
    type: Number,
    default: 15, // in minutes
  },
  currentQueue: {
    type: Number,
    default: 0,
  },
  feedback: [
    {
      patientName: String,
      comment: String,
      rating: Number,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, {
  timestamps: true,
});

// 🔐 Hash password before saving
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// ✅ Compare password
doctorSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Doctor", doctorSchema);
