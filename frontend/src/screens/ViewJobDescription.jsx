import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewJobDescription = () => {
  const jobDescriptions = useSelector(
    (state) => state.jobDescription.selectedJob
  );
  const params = useParams();
  const jobId = params.id;
  const job = jobDescriptions.find((job) => job._id === jobId);

  if (!jobDescriptions || Object.keys(jobDescriptions).length === 0) {
    return (
      <p className="text-center mt-4 text-gray-500">
        No job descriptions available.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {job.job_profile}
      </h2>
      <p className="text-sm text-gray-500 mb-2">
        at <span className="font-medium">{job.organisation_name}</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-4">
        <div>
          <strong>Location:</strong> <span>{job.job_location}</span>
        </div>
        <div>
          <strong>Job Type:</strong> <span>{job.job_type}</span>
        </div>
        <div>
          <strong>CTC:</strong> <span>{job.ctc}</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          Job Description
        </h3>
        <p className="text-gray-600">{job.job_description}</p>
      </div>

      <div className="mt-6">
        <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default ViewJobDescription;
