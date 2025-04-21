// DoctorAIChatbot.js
import { useState } from "react";

const DoctorAIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  // Handle user message
  const handleSendMessage = () => {
    if (userInput.trim() === "") return;
    
    // Add user message
    setMessages([...messages, { text: userInput, sender: "user" }]);
    
    // Simulate AI response
    setTimeout(() => {
      const botResponse = getBotResponse(userInput);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" },
      ]);
    }, 1000);
    
    // Clear user input field
    setUserInput("");
  };

  // Get bot response based on user input
  const getBotResponse = (input) => {
    if (input.toLowerCase().includes("available")) {
      return "The doctor is currently unavailable. How can I assist you?";
    } else if (input.toLowerCase().includes("report")) {
      return "Please share the patient's report to help you better.";
    } else if (input.toLowerCase().includes("medicine")) {
      return "Based on the symptoms, I would suggest medicine X. Please confirm with the doctor.";
    } else {
      return "I am here to help! Ask me anything.";
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md border-l-4 border-red-500 h-full">
      <div className="text-lg font-semibold text-red-600 mb-4">Doctor AI Chatbot</div>
      <div className="h-72 overflow-auto mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === "user" ? "text-right" : "text-left"}>
            <p
              className={msg.sender === "user" ? "bg-red-600 text-white p-2 rounded" : "bg-gray-100 p-2 rounded"}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="border border-gray-300 rounded p-2 w-full"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default DoctorAIChatbot;
