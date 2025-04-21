import React, { useState } from "react";

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Patient", text: "Hello Doctor, I have a fever." },
    { id: 2, sender: "Doctor", text: "Please take rest and stay hydrated." },
    { id: 3, sender: "Patient", text: "Should I come for a checkup?" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: "Doctor", text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Messages</h1>

      <div className="flex-1 overflow-y-auto bg-white p-4 rounded-lg shadow border border-red-200 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "Doctor"
                ? "bg-red-100 text-red-800 self-end ml-auto"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleSend}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
