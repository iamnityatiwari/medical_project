import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // ✅ Move fetchUser outside so it can be reused
  const fetchUser = async () => {
    if (!userId) return;

    try {
      const res = await axios.get(`/api/users/${userId}`);
      setUser(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/users/${userId}`, formData);
      setEditMode(false);
      setUser(res.data); // Immediately reflect changes
      setFormData(res.data);
      await fetchUser(); // Ensure fresh data
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-4 border-red-500 rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    navigate("/");
    return null; // Prevents render after navigation
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">
        Welcome, {user.name}
      </h1>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-red-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">{user.name}</h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {!editMode ? (
          <div className="space-y-2 text-gray-700">
            <p>📧 <strong>Email:</strong> {user.email}</p>
            <p>📞 <strong>Phone:</strong> {user.phone}</p>
            <p>🚻 <strong>Gender:</strong> {user.gender || "N/A"}</p>
            <p>🎂 <strong>Date of Birth:</strong> {user.dob || "N/A"}</p>
            <p>🏠 <strong>Address:</strong> {user.address || "N/A"}</p>
          </div>
        ) : (
          <UserForm
            formData={formData}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
            editMode={editMode}
          />
        
        )}
      </div>
    </div>
  );
};

export default Profile;
