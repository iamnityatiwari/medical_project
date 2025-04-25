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
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  roomId: {
    type: String,
    default: null,
  },
  isInCall: {
    type: Boolean,
    default: false,
  },
  callStartedAt: {
    type: Date,
    default: null,
  },
  callEndedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
