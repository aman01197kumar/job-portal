import { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import axios from "axios";
import JobPostedCard from "../components/JobPostedCard";

const JobPosted = ({userid}) => {
  const [jobDetails, setJobDetails] = useState([]);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/jobs/user/${userid}`
      );
      console.log(response?.data);

      // Ye important hai ab:
      const allJobs = response?.data?.data?.flatMap((item) => item.jobs) || [];
      setJobDetails(allJobs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  return (
    <div>
      <AdminHeader />
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 space-y-5 mt-5 ml-7">
        {jobDetails.length > 0 ? (
          jobDetails.map(({ organisation_name, job_profile }) => (
            <JobPostedCard
              organisation_name={organisation_name}
              job_profile={job_profile}
            />
          ))
        ) : (
          <p className="text-center mt-8">No jobs posted yet!</p>
        )}
      </div>
    </div>
  );
};

export default JobPosted;
