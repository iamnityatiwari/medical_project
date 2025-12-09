import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const DoctorAIChatbot = ({ doctorId }) => {
  const userId = localStorage.getItem("userId");
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  console.log(messages)
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const fetchChatHistory = async () => {
    try {
      console.log(userId, doctorId);
      const response = await axios.get(`http://localhost:8080/api/chat/${doctorId}/${userId}`);
      if (response.data && response.data.messages) {
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error("Failed to fetch chat history", error);
    }
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === "") {
      alert("Please enter your message.");
      return;
    }

    const userMsg = { text: userInput, sender: "user", timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:9000/query/", {
        doctor_id: doctorId,
        user_query: userInput,
      });

      const botMsg = {
        text: response.data.result,
        sender: "bot",
        timestamp: new Date(),
      };

      await axios.post("http://localhost:8080/api/chat/save", {
        doctorId,
        userId,
        userQuery: userInput,
        botResponse: response.data.result,
      });

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Failed to send message", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "❌ Failed to get a response. Please try again later.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
      setUserInput("");
    }
  };

  return (
    <div className="flex flex-col h-full ">
      {/* Header */}
      <div className="text-xl font-bold text-red-600 mb-2 flex items-center gap-2">
        🩺 Doctor AI Chatbot
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-3 px-1 space-y-3" style={{ minHeight: "250px", maxHeight: "350px" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-3 max-w-[70%] text-sm break-words shadow-sm ${
                msg.sender === "user"
                  ? "bg-red-600 text-white rounded-2xl rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-2xl text-sm max-w-[70%] animate-pulse">
              Typing...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full transition-all text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default DoctorAIChatbot;
