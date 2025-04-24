import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { useState } from "react";

const UnifiedNavBar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const role = user?.role || localStorage.getItem("userRole");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-red-500">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-4 py-3">
        <div className="text-red-600 text-2xl font-bold">CareNet</div>

        <button
          className="lg:hidden text-red-600 focus:outline-none"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden w-full lg:w-auto lg:flex ${
            isMenuOpen ? "max-h-[1000px] pt-4" : "max-h-0 lg:max-h-full"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center w-full lg:w-auto">
            {!user && !localStorage.getItem("userId") && (
              <>
                <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
                <NavLink to="/signup" onClick={closeMenu}>Sign Up</NavLink>
              </>
            )}

            {role === "user" && (
              <>
                <NavLink to="/user" onClick={closeMenu}>Home</NavLink>
                <NavLink to="/user/doctors" onClick={closeMenu}>Doctor List</NavLink>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="text-red-600 hover:text-red-800 font-semibold transition relative group"
                >
                  <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 group-hover:after:w-full after:transition-all after:duration-300">
                    Logout
                  </span>
                </button>
              </>
            )}

            {role === "doctor" && (
              <>
                <NavLink to="/doctor" onClick={closeMenu}>Dashboard</NavLink>
                <NavLink to="/doctor/profile" onClick={closeMenu}>Profile</NavLink>
                <NavLink to="/doctor/appointments/today" onClick={closeMenu}>Today's Appointments</NavLink>
                <NavLink to="/doctor/appointments/history" onClick={closeMenu}>History</NavLink>
                <NavLink to="/doctor/assistant" onClick={closeMenu}>AI Assistant</NavLink>
                <NavLink to="/doctor/messages" onClick={closeMenu}>Messages</NavLink>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="text-red-600 hover:text-red-800 font-semibold transition relative group"
                >
                  <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 group-hover:after:w-full after:transition-all after:duration-300">
                    Logout
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// ✅ Reusable NavLink with animated underline
const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-red-600 hover:text-red-800 font-semibold relative group transition"
  >
    <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 group-hover:after:w-full after:transition-all after:duration-300">
      {children}
    </span>
  </Link>
);

export default UnifiedNavBar;
