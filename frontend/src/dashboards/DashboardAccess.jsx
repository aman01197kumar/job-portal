import JobSeekerDashboard from "./JobSeekerDashboard";
import { END_POINTS } from "../assets/END_POINTS";
import EmployerDashboard from "./EmployerDashboard";
import useFetchUser from "../hooks/useFetchUser";


const DashboardAccess = ({ token }) => {
  const { data, loading, error } = useFetchUser({
    token,
    END_POINT: END_POINTS.DASHBOARD_ACCESS
  })

  const feature_selection = data?.feature_selection

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return (
    <div className="w-full bg-gray-100">
      {feature_selection === "Job Seeker" ? (
        <JobSeekerDashboard token={token} />
      ) : feature_selection === "employer" ? (
        <EmployerDashboard userData={data} />
      ) : (
        <h1>Page not found</h1>
      )}
    </div>
  );
};

export default DashboardAccess;


