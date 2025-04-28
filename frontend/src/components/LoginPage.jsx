import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import image1 from "../images/images1.jpg";
import image2 from "../images/images2.jpg";
import image3 from "../images/images3.png";


const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      let response;
      if (role === "doctor") {
        response = await axios.post("http://localhost:8080/api/doctor/login", { email, password }, { withCredentials: true });
      } else {
        response = await axios.post("http://localhost:8080/api/users/login", { email, password }, { withCredentials: true });
      }

      if (response.data.user) {
        const user = response.data.user;
        localStorage.setItem("userId", user._id);
        login(user, role);

        setTimeout(() => {
          if (role === "doctor") {
            navigate("/doctor");
          } else {
            navigate("/user/profile");
          }
        }, 100);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError(err?.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-white p-6">
      <div className="relative w-[750px] h-[500px] perspective-1500">

        {/* Book Background */}
        <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden border-[6px] border-white">
          {/* Book Spine */}
          <div className="absolute inset-y-0 left-1/2 w-2 bg-gray-300 rounded-full shadow-inner"></div>
        </div>

        {/* Book Content */}
        <div
          className={`relative w-full h-full transition-transform duration-1000 transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""
            }`}
        >
          {/* Front side (User login) */}
          <div className="absolute w-full h-full backface-hidden flex">
            {/* Left Page */}
            <div className="w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-white to-red-50 rounded-l-2xl shadow-inner">
              <h2 className="text-3xl font-bold text-red-600 mb-6">User Login</h2>
              <p className="text-lg text-gray-700 mb-6">
                Please login to access your appointments and medical history.
              </p>
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
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
              <button
                onClick={() => { setRole("user"); handleLogin(); }}
                className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-all duration-300"
              >
                Login as User
              </button>
              <button
                onClick={() => setIsFlipped(true)}
                className="mt-4 text-sm text-gray-600 hover:text-red-600 transition-all duration-300"
              >
                Login as Doctor?
              </button>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>

            {/* Right Page - Image */}
            <div className="w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-white to-red-50 rounded-r-2xl shadow-inner">
              <img
                src={image2}
                alt="Medical Illustration"
                className="w-4/5"
              />
            </div>
          </div>

          {/* Back side (Doctor login) */}
          <div className="absolute w-full h-full rotate-y-180 backface-hidden flex">
            {/* Left Page - Image */}
            <div className="w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-white to-red-50 rounded-l-2xl shadow-inner">
              <img
                src={image3}
                alt="Doctor Illustration"
                className="w-4/5"
              />
            </div>

            {/* Right Page - Doctor Form */}
            <div className="w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-white to-red-50 rounded-r-2xl shadow-inner">
              <h2 className="text-3xl font-bold text-red-600 mb-6">Doctor Login</h2>
              <p className="text-lg text-gray-700 mb-6">
                Login to manage your patients and appointments.
              </p>
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
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
              <button
                onClick={() => { setRole("doctor"); handleLogin(); }}
                className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-all duration-300"
              >
                Login as Doctor
              </button>
              <button
                onClick={() => setIsFlipped(false)}
                className="mt-4 text-sm text-gray-600 hover:text-red-600 transition-all duration-300"
              >
                Back to User Login
              </button>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
