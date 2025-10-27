import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("authToken");
  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole) {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== requiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
