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
    default: 0.0,
  },
  location: {
    type: String,
  },
  fee: {
    type: Number,
    default: 300,
  },
  interval: {
    type: Number,
    default: 15,
  },
  currentQueue: {
    type: Number,
    default: 4,
  },
  startTime: {
    type: String,
    default: "16:00",
  },
  endTime: {
    type: String,
    default: "23:00",
  },
  breakStart: {
    type: String,
    default: "19:00",
  },
  breakEnd: {
    type: String,
    default: "19:40",
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



// ✅ Compare password
doctorSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Doctor", doctorSchema);



