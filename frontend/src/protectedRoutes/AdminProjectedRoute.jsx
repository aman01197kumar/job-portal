import { Navigate, useLocation } from "react-router-dom";

const AdminProtectedRoute = ({ userData, children }) => {
  const location = useLocation();

  // If no token → redirect to login
  if (!userData?.token) {
    return (
      <Navigate
        to="/"
        replace
        state={{ message: "Please login first!", from: location.pathname }}
      />
    );
  }

  // If role mismatch → redirect with message
  if (userData?.user_type !== "employer") {
    return (
      <Navigate
        to="/unauthorized"
        replace
        state={{
          message: "Unauthorized Access! Please login",
          from: location.pathname,
        }}
      />
    );
  }

  // If everything is correct
  return children;
};

export default AdminProtectedRoute;
