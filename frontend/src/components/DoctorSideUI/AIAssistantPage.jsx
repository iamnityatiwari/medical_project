import React, { useState } from "react";
import axios from "axios";

export default function AIAssistantPage() {
  const userId = localStorage.getItem("userId");
  const doctorId = userId;
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false); // New state for loading

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("doctor_id", doctorId);
    formData.append("file", file);

    try {
      setIsUploading(true); // Start loading
      const response = await axios.post("http://localhost:8000/upload_pdf/", formData);
      setUploadStatus(response.data.message);
    } catch (error) {
      setUploadStatus("❌ Failed to upload the file. Please try again.");
    } finally {
      setIsUploading(false); // Stop loading after success or failure
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

        {/* Upload Button */}
        <button
          onClick={handleFileUpload}
          disabled={isUploading}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center justify-center w-full"
        >
          {isUploading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
          ) : (
            "Upload PDF"
          )}
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
