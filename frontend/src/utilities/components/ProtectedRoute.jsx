import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ userData }) => {
  if (!userData?.token) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  // if (!userData?.user?.user_type) {
  //   return <Navigate to="/feature-selection" replace />;
  // }
  return <Outlet />;
};

export default ProtectedRoute;
