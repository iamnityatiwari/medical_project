import React from "react";

const UserForm = ({ formData, handleChange, handleUpdate, editMode }) => (
  <form onSubmit={handleUpdate} className="space-y-4 mt-4">
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
    <select
      name="gender"
      required
      value={formData.gender || ""}
      onChange={handleChange}
      className="w-full border rounded p-2"
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>

    <input
      type="date"
      name="dob"
      required
      value={formData.dob || ""}
      onChange={handleChange}
      className="w-full border rounded p-2"
    />
    <input
      type="text"
      name="address"
      required
      value={formData.address || ""}
      onChange={handleChange}
      placeholder="Address"
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

export default UserForm;
