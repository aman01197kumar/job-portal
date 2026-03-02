import JobSeekerDashboard from "./JobSeekerDashboard";
import { END_POINTS } from "../assets/END_POINTS";
import useFetchFeatureSelection from "../hooks/fetchUser";
import AdminDashboard from "./AdminDashboard";


const DashboardSelection = ({token}) => {

  const feature_selection = useFetchFeatureSelection(token,END_POINTS.DASHBOARD_ACCESS);

  return (
    <div className="w-full bg-gray-100">
      {feature_selection === "Job Seeker" ?
        <JobSeekerDashboard token={token} /> :
        feature_selection === 'employer' ?
          <AdminDashboard token={token}/> : <h1 className="w-full h-max-screen flex justify-center align-items-center">Page not found</h1>}
    </div>
  );
};

export default DashboardSelection;
