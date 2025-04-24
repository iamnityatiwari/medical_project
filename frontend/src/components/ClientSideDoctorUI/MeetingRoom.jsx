import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; // For extracting query params if needed

// Sample placeholder video call functionality. Replace with actual video service.
const MeetingRoom = () => {
  const { id } = useParams(); // Get meeting ID from the URL
  const [isConnected, setIsConnected] = useState(false); // Track connection state
  const [participants, setParticipants] = useState([]); // Store participant details (for display)
  const navigate = useNavigate();

  // Start or end the video call
  const startCall = () => {
    // Initialize your video call service (Twilio, WebRTC, etc.)
    console.log("Starting call in room:", id);
    setIsConnected(true);
    
    // Example: Simulate participants joining
    setParticipants([{ name: "Doctor", id: "123" }, { name: "Patient", id: "456" }]);
  };

  const endCall = () => {
    console.log("Ending call in room:", id);
    setIsConnected(false);
    setParticipants([]);
  };

  // UseEffect for room logic (can handle things like reconnecting, loading room info, etc.)
  useEffect(() => {
    // You could load room info (e.g., via API) when the component mounts
    console.log("Room ID from URL:", id);
    
    // Sample logic to auto-start the call for demo purposes
    if (id) {
      startCall();
    }

    return () => {
      endCall(); // Clean up on component unmount
    };
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Meeting Room</h1>
      <p className="text-lg mb-8">Meeting ID: {id}</p>
      
      {isConnected ? (
        <div className="bg-white p-6 rounded shadow-lg space-y-4 w-full max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">Participants:</p>
            <button
              onClick={endCall}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              End Call
            </button>
          </div>

          {/* Video Call Section */}
          <div className="bg-gray-100 p-4 rounded shadow">
            {/* Here, integrate video streams from your call service (Twilio, WebRTC, etc.) */}
            <div className="space-y-4">
              {participants.map((participant, index) => (
                <div key={index} className="bg-white p-4 rounded shadow-md">
                  <p>{participant.name}</p>
                  <div
                    className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center"
                    style={{ background: "#ccc" }}
                  >
                    <p>{participant.name[0]}</p> {/* Placeholder for video */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={startCall}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Start Call
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetingRoom;
