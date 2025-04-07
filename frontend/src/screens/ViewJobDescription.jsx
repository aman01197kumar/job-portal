import React, { useContext } from "react";
import { JobContext } from "../App";
import { useParams } from "react-router-dom";

const ViewJobDescription = ({ loggedBy }) => {
  const dashboardJobPosted = useContext(JobContext);
  //   const [showJobPosted, setShowJobPosted] = useState(dashboardJobPosted);
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-900">
        {dashboardJobPosted[id].company_name}
      </h1>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium text-gray-700">Job Profile</h2>
            <p className="text-lg text-gray-600">
              {dashboardJobPosted[id].job_profile}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-medium text-gray-700">Job Type</h2>
            <p className="text-lg text-gray-600">
              {dashboardJobPosted[id].job_type}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium text-gray-700">CTC</h2>
            <p className="text-lg text-gray-600">
              {dashboardJobPosted[id].ctc}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-medium text-gray-700">Job Location</h2>
            <p className="text-lg text-gray-600">
              {dashboardJobPosted[id].job_location}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium text-gray-700">Job Description</h2>
          <p className="text-lg text-gray-600">
            {dashboardJobPosted[id].job_description}
          </p>
        </div>
      </div>
      {loggedBy === "job-seeker" ? (
        <div
          className="font-medium text-blue-600 dark:text-blue-500 hover:bg-sky-500/50 p-3 rounded cursor-pointer"
          style={{ minWidth: "70px" }}
          onClick={() => setIsApplied(!isApplied)}
        >
          {!isApplied ? "Apply" : "Applied"}
        </div>
      ) : (
        <div className="flex justify-end gap-2">
          <div
            className="font-medium text-blue-600 dark:text-blue-500 cursor-pointer hover:bg-sky-500/50 p-3 rounded "
            style={{ minWidth: "70px" }}
            onClick={() => removeJobHandler(index)}
          >
            Update
          </div>
          <div
            className="font-medium text-blue-600 dark:text-blue-500 cursor-pointer hover:bg-sky-500/50 p-3 rounded"
            style={{ minWidth: "70px" }}
          >
            Remove
          </div>
        </div>
      )}
    </div>
  );
};
export default ViewJobDescription;
