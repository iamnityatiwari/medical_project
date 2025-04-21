import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      let response;
  
      if (role === "doctor") {
        response = await axios.post("http://localhost:8080/api/doctor/login", {
          email,
          password,
        }, {
          withCredentials: true,
        });
      } else {
        response = await axios.post("http://localhost:8080/api/users/login", {
          email,
          password,
        }, {
          withCredentials: true,
        });
      }
  
      console.log("Login response", response.data);
  
      if (response.data.user) {
        const user = response.data.user;
        // localStorage.setItem("userId", user._id);
        login(user, role); // Call login from context
  
        if (response.data.user) {
          const user = response.data.user;
          localStorage.setItem("userId", user._id);
          login(user, role); // Call login from context
        
          setTimeout(() => {
            if (role === "doctor") {
              navigate("/doctor");
            } else {
              navigate("/user/profile");
            }
          }, 100); // Slight delay to ensure the context update has propagated
        }
        
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError(err?.response?.data?.message || "An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 md:p-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-red-600 mb-6">Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <div className="mb-6">
          <span className="text-gray-600">Login as:</span>
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
              <span className="text-red-600">Doctor</span>
            </label>
          </div>
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition"
        >
          Login
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
