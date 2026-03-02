import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { END_POINTS } from "../../assets/END_POINTS";
import AdminHeader from "../components/AdminHeader";
import "react-toastify/dist/ReactToastify.css";

const INITIAL_STATE = {
  organisation_name: "",
  ctc: "",
  job_type: "",
  job_profile: "",
  job_location: "",
  job_description: "",
};

const JobPosting = ({ userId }) => {
  const [createJob, setCreateJob] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = import.meta.env.BASE_URL;

  const addJobOpportunityHandler = async () => {
    if (Object.values(createJob).some((value) => !value.trim())) {
      toast.warn("Please fill out all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/${END_POINTS.CREATE_JOB}/${userId}`,
        createJob
      );

      if (response.status === 200) {
        toast.success(response?.data?.message);
        setCreateJob(INITIAL_STATE);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      console.error("Job creation failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center pt-24 px-4">
        <div className="w-full max-w-4xl bg-white/40 dark:bg-gray-800/60 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center text-blue-700 dark:text-white mb-8">
            Create a New Job Opportunity
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Organisation Name */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Organisation Name
              </label>
              <input
                type="text"
                value={createJob.organisation_name}
                onChange={(e) =>
                  setCreateJob((prev) => ({
                    ...prev,
                    organisation_name: e.target.value,
                  }))
                }
                placeholder="Enter organisation name"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* CTC */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                CTC
              </label>
              <input
                type="text"
                value={createJob.ctc}
                onChange={(e) =>
                  setCreateJob((prev) => ({ ...prev, ctc: e.target.value }))
                }
                placeholder="Enter annual CTC"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Job Type */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Job Type
              </label>
              <select
                value={createJob.job_type}
                onChange={(e) =>
                  setCreateJob((prev) => ({
                    ...prev,
                    job_type: e.target.value,
                  }))
                }
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Select job type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Freelancing">Freelancing</option>
              </select>
            </div>

            {/* Job Profile */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Job Profile
              </label>
              <select
                value={createJob.job_profile}
                onChange={(e) =>
                  setCreateJob((prev) => ({
                    ...prev,
                    job_profile: e.target.value,
                  }))
                }
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Select job profile</option>
                <option value="Full Stack Development (MERN)">
                  Full Stack Development (MERN)
                </option>
                <option value="Full Stack Development (MEAN)">
                  Full Stack Development (MEAN)
                </option>
                <option value="Frontend Development (React)">
                  Frontend Development (React)
                </option>
                <option value="Backend Development (Node.js)">
                  Backend Development (Node.js)
                </option>
              </select>
            </div>

            {/* Job Location */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Job Location
              </label>
              <select
                value={createJob.job_location}
                onChange={(e) =>
                  setCreateJob((prev) => ({
                    ...prev,
                    job_location: e.target.value,
                  }))
                }
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Select location</option>
                <option value="Delhi">Delhi</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Chennai">Chennai</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>

            {/* Job Description */}
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Job Description
              </label>
              <textarea
                rows={4}
                value={createJob.job_description}
                onChange={(e) =>
                  setCreateJob((prev) => ({
                    ...prev,
                    job_description: e.target.value,
                  }))
                }
                placeholder="Describe the role, responsibilities, and requirements..."
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={addJobOpportunityHandler}
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Job
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </>
  );
};

export default JobPosting;
