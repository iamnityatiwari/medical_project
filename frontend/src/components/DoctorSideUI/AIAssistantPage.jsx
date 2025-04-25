import React, { useState } from "react";
import axios from "axios";

export default function AIAssistantPage() {
  const userId = localStorage.getItem("userId");
  const doctorId = userId; // Assuming userId is the doctor ID
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("doctor_id", doctorId); // Use the dynamic doctorId
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/upload_pdf/", formData);

      setUploadStatus(response.data.message);
    } catch (error) {
      setUploadStatus("❌ Failed to upload the file. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white border border-red-300 rounded-lg shadow-md p-8 text-center w-full max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">AI Assistant</h1>
        <p className="text-gray-700 text-lg mb-6">
          Your smart assistant is here to help you with patient queries and appointment insights.
        </p>

        {/* File Upload Section */}
        <div className="mb-6">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>
        <button
          onClick={handleFileUpload}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Upload PDF
        </button>

        {/* Upload Status */}
        {uploadStatus && (
          <p className="mt-4 text-sm text-gray-600">
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
}
