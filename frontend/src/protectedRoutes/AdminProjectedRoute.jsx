import { Navigate, useLocation, Outlet } from "react-router-dom";

const AdminProtectedRoute = ({ userData }) => {
  const location = useLocation();

  // Not logged in
  if (!userData?.token) {
    return (
      <Navigate
        to="/"
        replace
        state={{ message: "Please login first!", from: location.pathname }}
      />
    );
  }

  // Not employer / admin
  if (userData?.user_type !== "employer") {
    return (
      <Navigate
        to="/unauthorized"
        replace
        state={{
          message: "Unauthorized Access!",
          from: location.pathname,
        }}
      />
    );
  }

  // ✅ Allow nested admin routes
  return <Outlet />;
};

export default AdminProtectedRoute;
