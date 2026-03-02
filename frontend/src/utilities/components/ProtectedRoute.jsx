import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ token }) => {
  const location = useLocation();

  if (!token) {
    // user is not authenticated
    // Prevent infinite loop if already at the target path ("/")
    if (location.pathname === "/") {
      return <Outlet />;
    }
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
