import MainContent from "../User/screens/MainContent";
import AdminDashboard from "../Employer/screens/AdminDashboard";


const Dashboard = ({userData}) => {
  return (
    <div className="w-full bg-gray-100">
      {userData && userData?.user_type === "job-seeker" ?
        <MainContent userId={userData?.userId}/> :
        userData?.user_type === 'employer' ?
          <AdminDashboard userData = {userData}/> : <h1 className="w-full h-max-screen flex justify-center align-items-center">Page not found</h1>}
    </div>
  );
};

export default Dashboard;
