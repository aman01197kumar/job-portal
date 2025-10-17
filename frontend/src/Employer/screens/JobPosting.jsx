import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL, END_POINTS } from "../../assets/END_POINTS";
import AdminHeader from "../components/AdminHeader";

const INITIAL_STATE = {
  organisation_name: '',
  ctc: '',
  job_type: '',
  job_profile: '',
  job_location: '',
  job_description: ''
};

const JobPosting = ({ userId }) => {
  const [createJob, setCreateJob] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);

  const addJobOpportunityHandler = async () => {
    // Basic validation
    if (Object.values(createJob).some(value => !value.trim())) {
      toast.warn("Please fill out all fields.");
      return;
    }

    setIsLoading(true);

    try {
      // The backend likely expects the job data directly.
      // The userId is already in the URL, so it's not needed in the body.
      const response = await axios.post(
        `${BASE_URL}/${END_POINTS.CREATE_JOB}/${userId}`,
        createJob
      );

      if (response.status === 200) {
        toast.success(response?.data?.message);
        // Reset form only on success
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
      <div className="w-full">
        <div className=" p-4 w-full w-80 max-h-full bg-white rounded-lg shadow-lg dark:bg-gray-700">
          <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className=" text-lg font-semibold text-gray-900 dark:text-white">
              Create New Job Opportunity
            </h3>
          </div>

          <div className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Organisation's Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Organisation's Name"
                  value={createJob.organisation_name}
                  onChange={(e) => setCreateJob(prev => ({ ...prev, organisation_name: e.target.value }))}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  CTC
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="CTC"
                  value={createJob.ctc}
                  onChange={(e) => setCreateJob(prev => ({ ...prev, ctc: e.target.value }))}
                />
              </div>
              <div className="col-span-2 ">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Job Type
                </label>
                <select
                  value={createJob.job_type}
                  onChange={(e) => setCreateJob(prev => ({ ...prev, job_type: e.target.value }))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Select Job Type</option>
                  <option value="Full Type">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelancing">Freelancing</option>
                </select>
              </div>
              <div className="col-span-2  w-full">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Job Profile
                </label>
                <select
                  onChange={(e) => setCreateJob(prev => ({ ...prev, job_profile: e.target.value }))}
                  value={createJob.job_profile}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Select Job Profile</option>
                  <option value="Full Stack Development(MERN)">
                    Full Stack Development(MERN)
                  </option>
                  <option value="Full Stack Development(MEAN)">
                    Full Stack Development(MEAN)
                  </option>
                  <option value="Full Stack Development(MEVN)">
                    Full Stack Development(MEVN)
                  </option>
                  <option value="Frontend Development(Reactjs)">
                    Frontend Development(Reactjs)
                  </option>
                </select>
              </div>
              <div className="col-span-2 ">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Job Location
                </label>
                <select
                  onChange={(e) => setCreateJob(prev => ({ ...prev, job_location: e.target.value }))}
                  value={createJob.job_location}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Select Job Location</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Job Description
                </label>
                <textarea
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Job description...."
                  onChange={(e) => setCreateJob(prev => ({ ...prev, job_description: e.target.value }))}
                  value={createJob.job_description}
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={addJobOpportunityHandler}
              disabled={isLoading}
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              {isLoading ? "Submitting..." : "Add Job Opportunity"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default JobPosting;
