import { Route, Routes, useLocation } from "react-router-dom";

import UnifiedNavBar from "./components/UnifiedNavBar";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDashboard from "./components/ClientSideDoctorUI/UserDashboard";
import DoctorListPage from "./components/ClientSideDoctorUI/DoctorListPage";
import DoctorDetailPage from "./components/ClientSideDoctorUI/DoctorDetailPage";

import DoctorDashboard from "./components/DoctorSideUI/DoctorDashboard";
import DoctorProfilePage from "./components/DoctorSideUI/DoctorProfilePage";
import TodayAppointmentsPage from "./components/DoctorSideUI/TodayAppointmentsPage";
import AppointmentHistoryPage from "./components/DoctorSideUI/AppointmentHistoryPage";
import AIAssistantPage from "./components/DoctorSideUI/AIAssistantPage";
import MessagesPage from "./components/DoctorSideUI/MessagesPage";
import SignUpPage from "./components/SignupPage";

// NEW: Import nested user dashboard pages
import Profile from "./components/ClientSideDoctorUI/Profile";
import HistoryAppointment from "./components/ClientSideDoctorUI/HistoryAppointment";
import CurrentAppointment from "./components/ClientSideDoctorUI/CurrentAppointment";
import UserWork from "./components/ClientSideDoctorUI/UserWork";

const AppContent = () => {
  const location = useLocation();
  const hideNavRoutes = ["/", "/signup", "/login"];

  const shouldShowNav = !hideNavRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNav && <UnifiedNavBar />}
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* USER SIDE */}
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          >
            {/* Nested routes under /user */}
            <Route index element={<UserWork />} />
            <Route  path="profile" element={<Profile />} />
            <Route path="history" element={<HistoryAppointment />} />
            <Route path="current" element={<CurrentAppointment />} />
          </Route>

          <Route
            path="/user/doctors"
            element={
              <ProtectedRoute allowedRole="user">
                <DoctorListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/doctor/:id"
            element={
              <ProtectedRoute allowedRole="user">
                <DoctorDetailPage />
              </ProtectedRoute>
            }
          />

          {/* DOCTOR SIDE */}
          <Route
            path="/doctor"
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/profile"
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/appointments/today"
            element={
              <ProtectedRoute allowedRole="doctor">
                <TodayAppointmentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/appointments/history"
            element={
              <ProtectedRoute allowedRole="doctor">
                <AppointmentHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/assistant"
            element={
              <ProtectedRoute allowedRole="doctor">
                <AIAssistantPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/messages"
            element={
              <ProtectedRoute allowedRole="doctor">
                <MessagesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return <AppContent />;
}

export default App;
