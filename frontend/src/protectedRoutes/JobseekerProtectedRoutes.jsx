import { Navigate,Outlet } from "react-router-dom";


const JobSeekerProtectedRoute = ({ userData}) => {

  if (!userData?.token) return <Navigate to="/" />;

  if (userData?.user_type !== "job seeker")
    return (
      <>
        <h1>Unauthorized Access! Please Login</h1>
        <Navigate to="/" />;
      </>
    );

  return <Outlet/>;
};

export default JobSeekerProtectedRoute;
