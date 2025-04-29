import React from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <AdminHeader />
      <div className="flex justify-center items-center min-h-screen gap-4 pt-20">
        <div
          className="flex p-4 w-50 border rounded gap-2 font-bold text-blue-900/50 hover:shadow-md dark:text-sky-900/50 cursor-pointer items-center"
          onClick={() => navigate("/admin/job-posting")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-16 h-16 font-extrabold"
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
          <p>Post a Job</p>
        </div>
        <div
          className="flex p-4 w-50 border rounded gap-2 text-blue-900/50 dark:text-sky-900/50 hover:shadow-md font-bold cursor-pointer items-center"
          onClick={() => navigate("/job-posted")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-16 h-16 font-extrabold"
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
          <p>Job Posted</p>
        </div>
        <div
          className="flex p-4 w-50 border rounded gap-2 text-blue-900/50 font-bold hover:shadow-md dark:text-sky-900/50 cursor-pointer items-center"
          onClick={() => navigate("/user-profile")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-16 h-16 font-extrabold"
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
          <p>Admin Profile</p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
