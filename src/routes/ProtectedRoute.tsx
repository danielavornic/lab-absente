import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
