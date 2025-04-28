import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import image4 from "../images/images4.png";
import image5 from "../images/images5.png";  
import image6 from "../images/images6.png";


const SignUpPage = () => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      let response;
      const payload = { name, email, password };

      if (role === "doctor") {
        response = await axios.post("http://localhost:8080/api/doctor/register", payload, { withCredentials: true });
      } else {
        response = await axios.post("http://localhost:8080/api/users/register", payload, { withCredentials: true });
      }

      if (response.data.user) {
        navigate("/"); // Redirect to login page
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } catch (err) {
      console.error("Sign-up failed", err);
      setError(err?.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-white p-6">
      <div className="relative w-[750px] h-[550px] perspective-1500">

        {/* Book Background */}
        <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden border-[6px] border-white">
          {/* Book Spine */}
          <div className="absolute inset-y-0 left-1/2 w-2 bg-gray-300 rounded-full shadow-inner"></div>
        </div>

        {/* Book Content */}
        <div className={`relative w-full h-full transition-transform duration-1000 transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}>
          {/* Front side (User signup) */}
          <div className="absolute w-full h-full backface-hidden flex">
            {/* Left Page */}
            <div className="w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-white to-green-50 rounded-l-2xl shadow-inner">
              <h2 className="text-3xl font-bold text-green-600 mb-6">User Sign Up</h2>
              <p className="text-lg text-gray-700 mb-6">
                Create your account to book appointments and manage your health records.
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
              <button
                onClick={() => { setRole("user"); handleSignUp(); }}
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-all duration-300"
              >
                Sign Up as User
              </button>
              <button
                onClick={() => setIsFlipped(true)}
                className="mt-4 text-sm text-gray-600 hover:text-green-600 transition-all duration-300"
              >
                Sign up as Doctor?
              </button>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/" className="text-blue-600 hover:underline">
                    Login here
                  </Link>
                </p>
              </div>
            </div>

            {/* Right Page - Image */}
            <div className="w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-white to-green-50 rounded-r-2xl shadow-inner">
              <img
                src={image5}
                alt="User SignUp Illustration"
                className="w-4/5"
              />
            </div>
          </div>

          {/* Back side (Doctor signup) */}
          <div className="absolute w-full h-full rotate-y-180 backface-hidden flex">
            {/* Left Page - Image */}
            <div className="w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-white to-green-50 rounded-l-2xl shadow-inner">
              <img
                src={image6}
                alt="Doctor SignUp Illustration"
                className="w-4/5"
              />
            </div>

            {/* Right Page - Doctor Form */}
            <div className="w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-white to-green-50 rounded-r-2xl shadow-inner">
              <h2 className="text-3xl font-bold text-green-600 mb-6">Doctor Sign Up</h2>
              <p className="text-lg text-gray-700 mb-6">
                Join as a doctor and start managing your patients online.
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
              <button
                onClick={() => { setRole("doctor"); handleSignUp(); }}
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-all duration-300"
              >
                Sign Up as Doctor
              </button>
              <button
                onClick={() => setIsFlipped(false)}
                className="mt-4 text-sm text-gray-600 hover:text-green-600 transition-all duration-300"
              >
                Back to User Sign Up
              </button>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/" className="text-blue-600 hover:underline">
                    Login here
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

export default SignUpPage;
