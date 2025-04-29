import React from "react";

const JobPostedCard = ({ organisation_name, job_profile }) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:cursor-pointer hover:shadow-md h-25">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {organisation_name}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700">{job_profile}</p>
    </div>
  );
};

export default JobPostedCard;
