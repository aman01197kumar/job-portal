import React from "react";
import MainContent from "../components/MainContent";
import AdminDashboard from "./AdminDashboard";

const Dashboard = ({ user_type }) => {
  console.log(user_type,'tuu')
  return (
    <div className="w-full bg-gray-100">
      {user_type&&user_type === "job-seeker" ? <MainContent /> : <AdminDashboard />}
    </div>
  );
};

export default Dashboard;
