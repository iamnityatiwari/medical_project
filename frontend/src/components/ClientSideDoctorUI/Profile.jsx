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
      setUser(res.data);
      setFormData(res.data);
      await fetchUser();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-4xl mx-auto bg-red-50 border border-red-200 shadow-xl rounded-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-red-600">Welcome, {user.name}</h1>
            <p className="text-gray-600 text-sm mt-1">Manage your profile information</p>
          </div>
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-medium shadow"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {!editMode ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <ProfileField label="📧 Email" value={user.email} />
            <ProfileField label="📞 Phone" value={user.phone} />
            <ProfileField label="🚻 Gender" value={user.gender || "N/A"} />
            <ProfileField label="🎂 Date of Birth" value={user.dob || "N/A"} />
            <ProfileField label="🏠 Address" value={user.address || "N/A"} className="md:col-span-2" />
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

// ✅ Reusable field display
const ProfileField = ({ label, value, className = "" }) => (
  <div className={`bg-white border border-red-200 rounded-lg p-4 shadow-sm ${className}`}>
    <p className="text-sm font-semibold text-red-500">{label}</p>
    <p className="text-base mt-1">{value}</p>
  </div>
);

export default Profile;
