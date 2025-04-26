const Chat = require('../models/Chat');

// 1. Get previous chats
exports.getChatByDoctorAndUser = async (req, res) => {
  try {
    const { doctorId, userId } = req.params;

    let chat = await Chat.findOne({ doctorId, userId });
    if (!chat) {
      return res.status(200).json({ messages: [] }); // no chat yet
    }

    res.status(200).json({ messages: chat.messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching chat' });
  }
};

// 2. Save new user question and bot answer
exports.saveChatMessage = async (req, res) => {
  try {
    const { doctorId, userId, userQuery, botResponse } = req.body;

    let chat = await Chat.findOne({ doctorId, userId });

    if (!chat) {
      chat = new Chat({ doctorId, userId, messages: [] });
    }

    chat.messages.push(
      { sender: 'user', text: userQuery },
      { sender: 'bot', text: botResponse }
    );

    await chat.save();

    res.status(201).json({ message: 'Chat updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while saving chat' });
  }
};
