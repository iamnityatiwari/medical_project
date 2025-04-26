import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate(); // 👈 navigation hook
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.classList.contains("sidebar-trigger")
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Profile", path: "/user/profile" },
    { name: "History Appointment", path: "/user/history" },
    { name: "Current Appointment", path: "/user/current" },
  ];

  return (
    <div className="relative min-h-screen bg-white text-red-700 overflow-hidden">

      {/* Tap area to open sidebar */}
      <div
        className="fixed top-0 left-0 w-4 h-full z-40 sidebar-trigger"
        onClick={() => setIsSidebarOpen(true)}
      ></div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-red-600 to-red-500 text-white p-8 z-50 transform transition-all duration-500 ease-in-out shadow-lg
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between mb-10">
          {/* Make Dashboard clickable */}
          <button
            onClick={() => {
              navigate("/user"); // 👈 on click, go to /user
              setIsSidebarOpen(false); // 👈 and close sidebar
            }}
            className="text-2xl font-bold text-left hover:underline focus:outline-none"
          >
            Dashboard
          </button>
          
          <button
            className="text-white hover:text-gray-300 focus:outline-none"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col space-y-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`transition-all duration-300 text-lg hover:scale-105 hover:underline ${
                location.pathname.includes(item.path.split("/")[2]) ? "font-bold underline" : ""
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Content overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-30 transition-opacity duration-500"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="relative z-10 transition-all duration-500 ease-in-out xl:ml-64 lg:ml-32 p-6 min-h-screen bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
