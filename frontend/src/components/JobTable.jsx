import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addJobDescription } from "../redux/jobDescription";

const JobTable = ({ loggedBy }) => {
  const [dashboardJobPosted, setDashboardJobPosted] = useState([]);
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/jobs");
      console.log("API Response:", response?.data);
      const allJobs = response?.data?.data?.flatMap((item) => item.jobs) || [];
      setDashboardJobPosted(allJobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const removeJobHandler = async (index) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/jobs/${index}`
      );
      console.log("Remove Job Response:", response?.data);
      fetchJobs();
    } catch (err) {
      console.error("Error removing job:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-4 text-gray-500">
        Loading job listings...
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">{error}</div>;
  }
  console.log(dashboardJobPosted, "third vikas");
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        {/* ... (rest of your filter and search UI remains the same) ... */}
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-100">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4"></th>
            <th scope="col" className="px-6 py-3">
              Company name
            </th>
            <th scope="col" className="px-6 py-3">
              Job Profile
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {dashboardJobPosted.map((job) => (
            <tr
              key={job?._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${job?._id}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`checkbox-table-search-${job?._id}`}
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {job["organisation_name"]}
              </th>
              <td className="px-6 py-4">{job["job_profile"]}</td>
              <td className="px-6 py-4">{job["job_type"]}</td>
              <td className="px-6 py-4 flex">
                <a
                  href={`/job-details/${job?._id}`}
                  onClick={() =>
                    dispatch(addJobDescription(dashboardJobPosted))
                  } // Pass the specific job object
                  target="_blank"
                  rel="noopener noreferrer" // Added for security
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  View
                </a>
                <span>/</span>

                <div
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                  style={{ minWidth: "70px" }}
                >
                  Apply
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
