import MainContent from "../User/screens/MainContent";
import AdminDashboard from "../Employer/screens/AdminDashboard";
import { END_POINTS } from "../assets/END_POINTS";


const Dashboard = ({ token }) => {
  const feature_selection = fetchUser(token,END_POINTS.DASHBOARD_ACCESS)

  
  console.log(feature_selection,'feayie')
  return (
    <div className="w-full bg-gray-100">
      {feature_selection === "job seeker" ?
        <MainContent userId={userData?.userId} /> :
        feature_selection === 'employer' ?
          <AdminDashboard userData={userData} /> : <h1 className="w-full h-max-screen flex justify-center align-items-center">Page not found</h1>}
    </div>
  );
};

export default Dashboard;
