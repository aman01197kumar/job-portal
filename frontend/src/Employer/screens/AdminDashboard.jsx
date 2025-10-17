import React from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Post a Job",
      path: "/admin/job-posting",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-14 h-14 text-blue-500"
        >
          <path
            fillRule="evenodd"
            d="M12 3a9 9 0 1 1-9 9A9.01 9.01 0 0 1 12 3Zm0 4.5a.75.75 0 0 1 .75.75v3h3a.75.75 0 0 1 0 1.5h-3v3a.75.75 0 0 1-1.5 0v-3h-3a.75.75 0 0 1 0-1.5h3v-3A.75.75 0 0 1 12 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: "Statistics",
      path: "/admin/stats",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-14 h-14 text-green-500"
        >
          <path
            fillRule="evenodd"
            d="M4.5 3.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 .75.75V6a.75.75 0 0 1-1.5 0V4.5h-12V6a.75.75 0 0 1-1.5 0V3.75ZM3 8.25A.75.75 0 0 1 3.75 7.5h16.5a.75.75 0 0 1 .75.75v11.25a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 19.5V8.25Zm3 2.25v9h12v-9H6Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      gradient: "from-green-400 to-green-600",
    },
    {
      title: "Employer Profile",
      path: "/user-profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-14 h-14 text-purple-500"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25a9.75 9.75 0 1 0 9.75 9.75A9.76 9.76 0 0 0 12 2.25Zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3Zm0 14.25a7.49 7.49 0 0 1-6-3c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.49 7.49 0 0 1-6 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      gradient: "from-purple-400 to-purple-600",
    },
  ];

  return (
    <>
      <AdminHeader />

      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-24 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-white mb-10 tracking-wide">
          Employer Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-16">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.path)}
              className={`relative cursor-pointer rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white/40 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200 dark:border-gray-700`}
            >
              <div
                className={`absolute inset-0 rounded-2xl opacity-20 bg-gradient-to-br ${card.gradient}`}
              ></div>
              <div className="relative z-10 flex flex-col items-center gap-4">
                {card.icon}
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
