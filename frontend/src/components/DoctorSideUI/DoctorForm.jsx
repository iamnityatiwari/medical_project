import React, { useState, useEffect } from "react";

export default function DoctorForm({ doctorData, onSave }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (doctorData) {
      setFormData(doctorData);
    }
  }, [doctorData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <>
      {/* Heading with Name */}
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
        Editing Profile: {formData.name ? `Dr. ${formData.name}` : "Doctor"}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Name */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Enter Name"
            className="w-full border rounded p-3"
          />
        </div>

        {/* Specialization */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization || ""}
            onChange={handleChange}
            placeholder="Enter Specialization"
            className="w-full border rounded p-3"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            disabled
            className="w-full border rounded p-3 bg-gray-100 cursor-not-allowed text-gray-500"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            required
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            className="w-full border rounded p-3"
          />
        </div>

        {/* Experience */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Experience</label>
          <input
            type="text"
            name="experience"
            required
            value={formData.experience || ""}
            onChange={handleChange}
            placeholder="Enter Experience"
            className="w-full border rounded p-3"
          />
        </div>

        {/* Education */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Education</label>
          <input
            type="text"
            name="education"
            required
            value={formData.education || ""}
            onChange={handleChange}
            placeholder="Enter Education"
            className="w-full border rounded p-3"
          />
        </div>

        {/* Clinic */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Clinic Name</label>
          <input
            type="text"
            name="clinic"
            required
            value={formData.clinic || ""}
            onChange={handleChange}
            placeholder="Enter Clinic Name"
            className="w-full border rounded p-3"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Clinic Location</label>
          <input
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            placeholder="Enter Clinic Location"
            className="w-full border rounded p-3"
          />
        </div>

        {/* Fee */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Consultation Fee</label>
          <input
            type="number"
            name="fee"
            value={formData.fee || ""}
            onChange={handleChange}
            placeholder="Enter Fee"
            className="w-full border rounded p-3"
          />
        </div>

        {/* Interval */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Interval (minutes)</label>
          <input
            type="number"
            name="interval"
            value={formData.interval || ""}
            onChange={handleChange}
            placeholder="Enter Interval"
            className="w-full border rounded p-3"
          />
        </div>

       

        {/* Start Time */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Start Time</label>
          <input
            type="text"
            name="startTime"
            value={formData.startTime || ""}
            onChange={handleChange}
            placeholder="e.g., 16:00"
            className="w-full border rounded p-3"
          />
        </div>

        {/* End Time */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">End Time</label>
          <input
            type="text"
            name="endTime"
            value={formData.endTime || ""}
            onChange={handleChange}
            placeholder="e.g., 23:00"
            className="w-full border rounded p-3"
          />
        </div>

        {/* Break Start */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Break Start</label>
          <input
            type="text"
            name="breakStart"
            value={formData.breakStart || ""}
            onChange={handleChange}
            placeholder="e.g., 19:00"
            className="w-full border rounded p-3"
          />
        </div>

        {/* Break End */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Break End</label>
          <input
            type="text"
            name="breakEnd"
            value={formData.breakEnd || ""}
            onChange={handleChange}
            placeholder="e.g., 19:40"
            className="w-full border rounded p-3"
          />
        </div>

        

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
}
