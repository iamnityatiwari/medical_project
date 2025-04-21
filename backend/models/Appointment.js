// models/Appointment.js

const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor", // references the Doctor model
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // references the User model
    required: true,
  },
  appointmentTime: {
    type: Date,
    required: true,
  },
  symptoms: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
},{
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model("Appointment", appointmentSchema);
