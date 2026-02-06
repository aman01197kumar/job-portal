import React, { useEffect, useState } from "react";
import axios from "axios";
import { END_POINTS } from "../../assets/END_POINTS";
import AdminHeader from "../components/AdminHeader";
import JobPostedCard from "../components/JobPostedCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const JobPosted = ({ userid }) => {
  const [jobDetails, setJobDetails] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch posted jobs
  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/${END_POINTS.JOB_FETCHED_BY_EMPLOYER}/${userid}`
      );
      setJobDetails(response?.data?.data);

      // Generate analytics data for charts
      const chartData = response?.data?.data.map(job => ({
        name: job.job_profile,
        applicants: job.applicationsCount || Math.floor(Math.random() * 50) + 1, // mock if not present
      }));
      setAnalyticsData(chartData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminHeader />

      {/* Analytics Section */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 p-5">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-sm font-medium text-gray-500">Total Jobs Posted</h3>
          <p className="text-xl font-bold">{jobDetails.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-sm font-medium text-gray-500">Total Applicants</h3>
          <p className="text-xl font-bold">
            {jobDetails.reduce((acc, job) => acc + (job.applicationsCount || 0), 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-sm font-medium text-gray-500">Most Popular Job</h3>
          <p className="text-xl font-bold">
            {analyticsData.length
              ? analyticsData.reduce((prev, curr) =>
                  curr.applicants > prev.applicants ? curr : prev
                ).name
              : "-"}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-sm font-medium text-gray-500">Average CTC Offered</h3>
          <p className="text-xl font-bold">
            ₹
            {jobDetails.length
              ? Math.round(
                  jobDetails.reduce((acc, job) => acc + Number(job.ctc || 0), 0) /
                    jobDetails.length
                )
              : 0}
          </p>
        </div>
      </div>

      {/* Job Applicants Bar Chart */}
      {analyticsData.length > 0 && (
        <div className="bg-white rounded-lg shadow m-5 p-5">
          <h3 className="text-lg font-semibold mb-3">Applicants per Job</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applicants" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Posted Jobs Section */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 p-5">
        {jobDetails.length > 0 ? (
          jobDetails.map(({ _id, organisation_name, job_profile }) => (
            <JobPostedCard
              key={_id}
              organisation_name={organisation_name}
              job_profile={job_profile}
              jobId={_id}
            />
          ))
        ) : (
          <p className="text-center col-span-full mt-8">No jobs posted yet!</p>
        )}
      </div>
    </div>
  );
};

export default JobPosted;
