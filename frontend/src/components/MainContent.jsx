import { FaPlusCircle, FaSearch } from "react-icons/fa";
import JobTable from "./JobTable";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
  return (
    <>
      <div className="space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Recent Job Listings</h2>
            <ul className="mt-4 space-y-3">
              <li className="flex justify-between items-center">
                <span>Software Engineer</span>
                <span className="bg-green-500 text-white py-1 px-3 rounded-full text-sm">
                  Active
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Product Manager</span>
                <span className="bg-gray-500 text-white py-1 px-3 rounded-full text-sm">
                  Closed
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Recent Applicants</h2>
            <ul className="mt-4 space-y-3">
              <li>John Doe</li>
              <li>Jane Smith</li>
              <li>Emily Davis</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center space-x-2">
                <FaSearch />
                <span>New job posting available</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaSearch />
                <span>John Doe applied to your job</span>
              </li>
            </ul>
          </div>
        </div>
        <JobTable />
      </div>
    </>
  );
};

export default MainContent;
