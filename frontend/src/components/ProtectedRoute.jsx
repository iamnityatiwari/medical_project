import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const ProtectedRoute = ({ allowedRole, children }) => {
  const { user, role, login } = useAuth();

  // Fallback to localStorage in case context is empty (e.g., after refresh)
  const storedUserId = localStorage.getItem("userId");
  const storedRole = localStorage.getItem("userRole");

  const isAuthenticated = user || storedUserId;
  const currentRole = role || storedRole;
  if(storedRole && storedRole){
    if(!user || !role){
      login(storedUserId, storedRole); // Update context with stored values
    } 
  }
  console.log("ProtectedRoute check:", { user, role, storedUserId, storedRole, allowedRole });

  if (!isAuthenticated || (allowedRole && currentRole !== allowedRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
