import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ userData }) => {
  if (!userData?.token) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
