const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Get chats
router.get('/:doctorId/:userId', chatController.getChatByDoctorAndUser);

// Save new message
router.post('/save', chatController.saveChatMessage);

module.exports = router;
