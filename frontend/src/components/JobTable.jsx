import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addJobDescription } from "../redux/jobDescription";

const JobTable = ({ loggedBy }) => {
  const [dashboardJobPosted, setDashboardJobPosted] = useState([]);
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const dispatch = useDispatch();

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/jobs");
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

  const applyJobHandler = async (job) => {
    try {
      setAppliedJobs((prev) => [...prev, job]);
      const checkApplied = appliedJobs.some((item) => item._id === job._id);
      if (checkApplied) {
        setIsApplied(true);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-100">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
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
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {dashboardJobPosted.map((job) => (
            <tr
              key={job?._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
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
                  className={`font-medium ${
                    appliedJobs.some((item) => item._id === job._id)
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-blue-600 hover:underline cursor-pointer"
                  }`}
                  style={{ minWidth: "70px" }}
                  onClick={() =>
                    !appliedJobs.some((item) => item._id === job._id) &&
                    applyJobHandler(job)
                  }
                >
                  {appliedJobs.some((item) => item._id === job._id)
                    ? "Applied"
                    : "Apply"}
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
