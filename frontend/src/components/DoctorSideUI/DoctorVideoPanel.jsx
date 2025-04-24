import React, { useEffect, useRef } from "react";

export default function DoctorVideoPanel({ onClose, patientQueue }) {
  const videoRef = useRef(null);
  const currentPatient = patientQueue?.[0]; // get first in queue

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    startVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  if (!currentPatient) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-2xl p-4 relative">
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Now Serving: <span className="text-blue-600">{currentPatient.name}</span>
          </h2>
          <p className="text-sm text-gray-500">Slot: {currentPatient.slot}</p>
        </div>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full rounded-lg border"
        />

        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          End Call
        </button>
      </div>
    </div>
  );
}
