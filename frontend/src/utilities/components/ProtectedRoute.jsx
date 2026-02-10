import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ userData }) => {
  if (!userData) {
    return <Navigate to="/" replace />;
  }

  // allow onboarding users
  if (!userData.token && userData.isOnboarding) {
    return <Outlet />;
  }

  // allow authenticated users
  if (userData.token) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
