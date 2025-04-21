import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      let response;
      const payload = { name, email, password };

      if (role === "doctor") {
        response = await axios.post("http://localhost:8080/api/doctor/register", payload, {
          withCredentials: true,
        });
      } else {
        response = await axios.post("http://localhost:8080/api/users/register", payload, {
          withCredentials: true,
        });
      }

      if (response.data.user) {
        navigate("/");
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } catch (err) {
      console.error("Sign-up failed", err);
      setError(err?.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 md:p-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-green-600 mb-6">Sign Up</h2>

        {/* Name input */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        {/* Email input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        {/* Password input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        {/* Role selection */}
        <div className="mb-6">
          <span className="text-gray-600">Sign up as:</span>
          <div className="flex items-center mt-2">
            <label className="mr-6">
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
                className="mr-2"
              />
              <span className="text-gray-700">User</span>
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="doctor"
                checked={role === "doctor"}
                onChange={() => setRole("doctor")}
                className="mr-2"
              />
              <span className="text-green-600">Doctor</span>
            </label>
          </div>
        </div>

        {/* Error message */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* Sign-up button */}
        <button
          onClick={handleSignUp}
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
        >
          Sign Up
        </button>

        {/* Link to login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-green-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
