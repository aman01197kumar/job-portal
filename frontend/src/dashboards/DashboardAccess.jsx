import JobSeekerDashboard from "./JobSeekerDashboard";
import { END_POINTS } from "../assets/END_POINTS";
import FetchUser from "../hooks/fetchUser";
import EmployerDashboard from "./EmployerDashboard";


const DashboardAccess = ({ token }) => {
  const data = FetchUser({token,END_POINT:END_POINTS.DASHBOARD_ACCESS})

  const feature_selection = data?.feature_selection
  
  return (
    <div className="w-full bg-gray-100">
      {feature_selection === "Job Seeker" ?
        <JobSeekerDashboard token = {token}/> :
        feature_selection === 'employer' ?
          <EmployerDashboard userData={userData} /> : <h1 className="w-full h-max-screen flex justify-center align-items-center">Page not found</h1>}
    </div>
    
  );
};

export default DashboardAccess;


