import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSignUp = async () => {
    console.log(role);
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const payload = { name, email, password };
      const endpoint =
        role === "doctor"
          ? "http://localhost:8080/api/doctor/register"
          : "http://localhost:8080/api/users/register";

      const response = await axios.post(endpoint, payload, {
        withCredentials: true,
      });

      if (response.data.user) {
        navigate("/"); // Redirect to login
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="user">User</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-300 rounded"
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleSignUp}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
