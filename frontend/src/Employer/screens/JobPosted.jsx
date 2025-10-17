import { useEffect, useState } from "react";
// import AdminHeader from "../components/AdminHeader";
import axios from "axios";
// import JobPostedCard from "../../components/JobPostedCard";
import { BASE_URL, END_POINTS } from "../../assets/END_POINTS";
import AdminHeader from "../components/AdminHeader";
import JobPostedCard from "../components/JobPostedCard";

const JobPosted = ({ userid }) => {
  const [jobDetails, setJobDetails] = useState([]);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/${END_POINTS.JOB_POSTED_BY_EMPLOYER}/${userid}`
      );

      setJobDetails(response?.data?.data);
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
          jobDetails.map(({ _id, organisation_name, job_profile }) => (
            <JobPostedCard
              organisation_name={organisation_name}
              job_profile={job_profile}
              key={_id}
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
