import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  console.log("user 1 2", isAuthenticated);
  if (!isAuthenticated && !isLoading) {
    console.log("not authenticated");
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};