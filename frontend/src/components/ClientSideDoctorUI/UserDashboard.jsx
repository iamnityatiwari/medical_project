import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const UserDashboard = () => {
  const location = useLocation();
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
        className={`fixed top-0 left-0 h-full w-64 bg-red-600 text-white p-6 z-50 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <h2 className="text-2xl font-bold mb-10">User Dashboard</h2>
        <nav className="flex flex-col space-y-6">
          <Link
            to="/user/profile"
            className={`hover:underline ${location.pathname.includes("profile") && "font-bold underline"
              }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/user/history"
            className={`hover:underline ${location.pathname.includes("history") && "font-bold underline"
              }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            History Appointment
          </Link>
          <Link
            to="/user/current"
            className={`hover:underline ${location.pathname.includes("current") && "font-bold underline"
              }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            Current Appointment
          </Link>
        </nav>
      </div>

      {/* Content overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="relative z-10 xl:mx-64 lg:mx-32 min-h-screen p-4">
        <Outlet />
      </div>

    </div>
  );
};

export default UserDashboard;
