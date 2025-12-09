import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User, Stethoscope } from "lucide-react"; // lucide-react icons

const AdminFrontend = () => {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes, doctorsRes] = await Promise.all([
          axios.get("http://localhost:8080/api/users"),
          axios.get("http://localhost:8080/api/doctor"),
        ]);
        setUsers(usersRes.data);
        setDoctors(doctorsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-12">Admin Dashboard</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Users Section */}
          <div className="bg-white border border-red-200 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <User className="text-red-600 mr-2" size={28} />
              <h2 className="text-2xl font-semibold text-red-600">Registered Users</h2>
            </div>
            {users.length > 0 ? (
              <ul className="space-y-3">
                {users.map((user) => (
                  <li
                    key={user._id}
                    className="flex justify-between items-center bg-red-50 hover:bg-red-100 p-4 rounded-lg transition"
                  >
                    <span className="text-gray-800 font-medium">{user.name}</span>
                    <Link
                      to={`/admin/user/${user._id}`}
                      className="text-red-600 hover:underline text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No users found.</p>
            )}
          </div>

          {/* Doctors Section */}
          <div className="bg-white border border-red-200 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Stethoscope className="text-red-600 mr-2" size={28} />
              <h2 className="text-2xl font-semibold text-red-600">Registered Doctors</h2>
            </div>
            {doctors.length > 0 ? (
              <ul className="space-y-3">
                {doctors.map((doctor) => (
                  <li
                    key={doctor._id}
                    className="flex justify-between items-center bg-red-50 hover:bg-red-100 p-4 rounded-lg transition"
                  >
                    <span className="text-gray-800 font-medium">{doctor.name}</span>
                    <Link
                      to={`/admin/doctor/${doctor._id}`}
                      className="text-red-600 hover:underline text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No doctors found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFrontend;
