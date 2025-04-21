import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        console.warn("No user ID found.");
        return;
      }

      try {
        const res = await axios.get(`/api/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-4 border-red-500 rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Welcome, {user.name}</h1>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-red-300">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">{user.name}</h2>
          
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-gray-700">
          <div><strong>Email:</strong> <p>{user.email}</p></div>
          <div><strong>Phone:</strong> <p>{user.phone}</p></div>
          <div><strong>Gender:</strong> <p>{user.gender || "N/A"}</p></div>
          <div><strong>Date of Birth:</strong> <p>{user.dob || "N/A"}</p></div>
          <div className="sm:col-span-2">
            <strong>Address:</strong> <p>{user.address || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
