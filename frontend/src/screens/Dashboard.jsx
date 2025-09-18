import React from "react";
import MainContent from "../User/screens/MainContent";
import AdminDashboard from "../Employer/screens/AdminDashboard";


const Dashboard = ({ user_type, userId }) => {
  return (
    <div className="w-full bg-gray-100">
      {user_type && user_type === "job-seeker" ? <MainContent userId={userId} /> : <AdminDashboard />}
    </div>
  );
};

export default Dashboard;
