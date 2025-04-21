import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { useState } from "react";

const UnifiedNavBar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Get role from context or fallback to localStorage
  const role = user?.role || localStorage.getItem("userRole");

  return (
    <nav className="flex flex-wrap justify-between items-center p-4 bg-white shadow-md border-b border-red-500">
      <div className="text-red-600 text-2xl font-semibold">
        <Link to="/">CareNet</Link>
      </div>

      <button className="lg:hidden text-red-600" onClick={toggleMenu}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className={`${isMenuOpen ? "flex" : "hidden"} lg:flex flex-col lg:flex-row lg:items-center w-full lg:w-auto gap-4 mt-4 lg:mt-0`}>
        {!user && !localStorage.getItem("userId") && (
          <>
            <Link to="/login" className="text-red-600 hover:text-red-800 font-semibold">Login</Link>
            <Link to="/signup" className="text-red-600 hover:text-red-800 font-semibold">Sign Up</Link>
          </>
        )}

        {role === "user" && (
          <>
            <Link to="/user" className="text-red-600 hover:text-red-800 font-semibold">Home</Link>
            <Link to="/user/doctors" className="text-red-600 hover:text-red-800 font-semibold">Doctor List</Link>
            <button onClick={logout} className="text-red-600 hover:text-red-800 font-semibold">Logout</button>
          </>
        )}

        {role === "doctor" && (
          <>
            <Link to="/doctor" className="text-red-600 hover:text-red-800 font-semibold">Dashboard</Link>
            <Link to="/doctor/profile" className="text-red-600 hover:text-red-800 font-semibold">Profile</Link>
            <Link to="/doctor/appointments/today" className="text-red-600 hover:text-red-800 font-semibold">Today's Appointments</Link>
            <Link to="/doctor/appointments/history" className="text-red-600 hover:text-red-800 font-semibold">History</Link>
            <Link to="/doctor/assistant" className="text-red-600 hover:text-red-800 font-semibold">AI Assistant</Link>
            <Link to="/doctor/messages" className="text-red-600 hover:text-red-800 font-semibold">Messages</Link>
            <button onClick={logout} className="text-red-600 hover:text-red-800 font-semibold">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default UnifiedNavBar;
