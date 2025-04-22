const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  appointmentTime: {
    type: Date,
    required: true,
  },
  slot: {
    type: String, // e.g. "6.41 - 7.00"
    required: true,
  },
  date: {
    type: String, // e.g. "2025-04-22"
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String, // or Number, depending on your use
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
