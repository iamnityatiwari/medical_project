import React, { useState, useEffect } from "react";

export default function DoctorForm({ doctorData, onSave }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Initialize form data with doctorData when it's passed in as props
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
    // Call the onSave prop function passed from the parent (DoctorProfilePage)
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        type="text"
        name="name"
        required
        value={formData.name || ""}
        onChange={handleChange}
        placeholder="Name"
        className="w-full border rounded p-2"
      />
      <input
        type="email"
        name="email"
        value={formData.email || ""}
        disabled
        className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed text-gray-500"
      />
      <input
        type="text"
        name="phone"
        required
        value={formData.phone || ""}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        name="experience"
        required
        value={formData.experience || ""}
        onChange={handleChange}
        placeholder="Experience"
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        name="education"
        required
        value={formData.education || ""}
        onChange={handleChange}
        placeholder="Education"
        className="w-full border rounded p-2"
      />
      <input
        type="text"
        name="clinic"
        required
        value={formData.clinic || ""}
        onChange={handleChange}
        placeholder="Clinic"
        className="w-full border rounded p-2"
      />

      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Save Changes
      </button>
    </form>
  );
}
