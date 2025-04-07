import React from "react";
import MainContent from "../components/MainContent";
import AdminDashboard from "./AdminDashboard";

const Dashboard = ({ loggedBy }) => {
  return (
    <div className="w-full p-6 bg-gray-100">
      {loggedBy === "job-seeker" ? <MainContent /> : <AdminDashboard />}
    </div>
  );
};

export default Dashboard;
