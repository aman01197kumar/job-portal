import React from "react";

const JobPostedCard = ({ organisation_name, job_profile, jobId }) => {
  return (
    <div className="bg-white shadow rounded-lg p-5 flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{job_profile}</h3>
        <p className="text-gray-500 mt-1">{organisation_name}</p>
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => alert(`View details for Job ID: ${jobId}`)}
        >
          View Details
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => alert(`Remove Job ID: ${jobId}`)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default JobPostedCard;
