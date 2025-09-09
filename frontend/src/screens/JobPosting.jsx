import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import AdminHeader from "../components/AdminHeader";
import { BASE_URL, END_POINTS } from "../assets/END_POINTS";

const JobPosting = ({ userId }) => {
  const [organizationName, setOrganizationName] = useState("");
  const [ctc, setCtc] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobProfile, setJobProfile] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const addJobOpportunityHandler = async () => {
    if (!userId) {
      toast.error("Something went wrong");
    }
    if (
      !organizationName ||
      !ctc ||
      !jobDescription ||
      !jobLocation ||
      !jobProfile ||
      !jobType
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    if (organizationName.length < 4) {
      toast.error("Organization name must be properly mentioned ");
      return;
    }
    if (Number(ctc) < 10000) {
      toast.error("ctc is not properly mentioned");
      return;
    }

    const job = {
      userId: userId,
      jobs: [
        {
          organisation_name: organizationName,
          ctc: ctc,
          job_type: jobType,
          job_profile: jobProfile,
          job_location: jobLocation,
          job_description: jobDescription,
        },
      ],
    };
    const response = await axios.post(`${BASE_URL}/${END_POINTS.JOBS}`, job);

    if (response?.data?.status === 401) {
      toast.error(response?.data?.message);
      return;
    }

    if (response?.data?.status === 500) {
      toast.error(response?.data?.message);
      return;
    }
    if (response?.data?.status === 200) {
      toast.success(response?.data?.message);
      return;
    }

    setCtc("");
    setJobDescription("");
    setJobLocation("");
    setJobProfile("");
    setJobType("");
    setOrganizationName("");
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
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
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
                  value={ctc}
                  onChange={(e) => setCtc(e.target.value)}
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
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Select Job Type</option>
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
                  onChange={(e) => setJobProfile(e.target.value)}
                  value={jobProfile}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Select Job Profile</option>
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
                  onChange={(e) => setJobLocation(e.target.value)}
                  value={jobLocation}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Select Job Location</option>
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
                  onChange={(e) => setJobDescription(e.target.value)}
                  value={jobDescription}
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={addJobOpportunityHandler}
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              Add Job Opportunity
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default JobPosting;
