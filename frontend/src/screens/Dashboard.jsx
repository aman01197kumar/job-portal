import MainContent from "../User/screens/MainContent";
import AdminDashboard from "../Employer/screens/AdminDashboard";


const Dashboard = ({ user_type, userId}) => {
  return (
    <div className="w-full bg-gray-100">
      {user_type && user_type === "job-seeker" ?
        <MainContent userId={userId}/> :
        user_type === 'employer' ?
          <AdminDashboard /> : <h1 className="w-full h-max-screen flex justify-center align-items-center">Page not found</h1>}
    </div>
  );
};

export default Dashboard;
