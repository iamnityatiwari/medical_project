const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',  // Optional, if you have a Doctor model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Optional, if you have a User model
    required: true,
  },
  messages: [
    {
      sender: { type: String, enum: ['user', 'bot'], required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
