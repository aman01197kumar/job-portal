import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL, END_POINTS } from "../assets/END_POINTS";
import Loader from "./Loader";
import {
  Search,
  Bookmark,
  FileText,
  MessageSquare,
  TrendingUp,
  MapPin,
  Building,
  DollarSign,
  Eye,
  ExternalLink,
  IndianRupee
} from "lucide-react";
import { Header } from "./Header";
import { addJobDescription } from "../redux/jobDescription";
import StatusCards from "./StatusCards";
import { savedJobs, notifications, dashboardStats } from "../assets/data/data";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const MainContent = ({ userId }) => {
  const [dashboardJobPosted, setDashboardJobPosted] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/${END_POINTS.JOBS}`, {
        "content-type": "application/json",
      });
      const allJobs = response?.data?.data?.flatMap((item) => item.jobs) || [];
      setDashboardJobPosted(allJobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);


  const jobAppliedHandler = async (application) => {
    try {
      const payload = {
        organisation_name: application?.organisation_name,
        job_profile: application?.job_profile,
        ctc: application?.ctc,
        description: application?.job_description,
        job_location: application?.job_location,
        job_type: application?.job_type,
      };

      // Make sure userId is defined
      if (!userId) {
        toast.error("User ID not found. Please log in again.");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/${END_POINTS.APPLICATION_SUBMITTED}/${userId}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}` // If your API requires auth
          },
        }
      );

      console.log(response?.data,'daatt');

      const { status, message, _id } = response?.data;

      if (status === 400) {
        toast.error(message);
        return;
      }

      if (status === 401) {
        toast.error(message);
        return;
      }

      if (status === 200) {
        toast.success(message);

        // Prevent duplicates
        // if (!appliedJobs.some((item) => item._id === _id)) {
        //   setAppliedJobs((prev) => [...prev, job]);
        // }
      }
    } catch (err) {
      console.error("Error while applying for job:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // const isApplied = (jobId) => appliedJobs.some((item) => item._id === jobId);



  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Job Seeker Dashboard
              </h1>
              <p className="mt-2 text-gray-600">
                Track your applications and discover new opportunities
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStats.map((stat) => (
              <div key={stat.title} onClick={() => navigate(`${stat.url}`)}>

                <StatusCards title={stat.title} color={stat.color} value={stat.value} icon={stat.icon} change={stat.change} />
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Applications */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-600" />
                      Recent Applications
                    </h2>
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View All
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {loading ? (

                      <Loader width={10} height={10} />


                    ) : (

                      dashboardJobPosted ? (
                        dashboardJobPosted.map((application) => (
                          <div
                            key={application.id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          >

                            <div className="flex-1 mb-4 sm:mb-0">
                              <h3 className="font-semibold text-gray-900">
                                {application.job_profile}
                              </h3>
                              <p className="text-gray-600 text-sm flex items-center mt-1">
                                <Building className="h-4 w-4 mr-1" />
                                {application.organisation_name}
                              </p>
                              <p className="text-gray-600 text-sm flex items-center mt-1">
                                <IndianRupee className="h-4 w-4 mr-1" />
                                {application.ctc}
                              </p>
                            </div>


                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                              <a
                                href={`/job-details/${application._id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>
                                  dispatch(addJobDescription(dashboardJobPosted))
                                }
                                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                              >
                                <Eye size={16} />
                                View Details
                              </a>

                              <button
                                onClick={() => jobAppliedHandler(application)}
                                // disabled={isApplied(application._id)}
                                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 
                                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                  : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                  }`}
                              >
                                <ExternalLink size={16} />
                                {/* {isApplied(application._id)
                                  ? "Applied"
                                  : "Apply Now"} */}
                              </button>


                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${application.statusColor}`}
                              >
                                {application.status}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : <p>{error}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Saved Jobs */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Bookmark className="h-5 w-5 mr-2 text-purple-600" />
                    Saved Jobs
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {savedJobs.map((job) => (
                      <div
                        key={job.id}
                        className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
                      >
                        <h3 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <Building className="h-3 w-3 mr-1" />
                          {job.company}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium text-green-600 flex items-center">
                            <DollarSign className="h-3 w-3 mr-1" />
                            {job.salary}
                          </span>
                          <span className="text-xs text-gray-400">
                            {job.postedDate}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All Saved Jobs
                  </button>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
                    Recent Activity
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start space-x-3"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <notification.icon className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All Notifications
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-left">
                <Search className="h-6 w-6 text-blue-600 mb-2" />
                <h3 className="font-medium text-gray-900">Search Jobs</h3>
                <p className="text-sm text-gray-600">
                  Find your next opportunity
                </p>
              </button>
              <button className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-left">
                <FileText className="h-6 w-6 text-green-600 mb-2" />
                <h3 className="font-medium text-gray-900">Update Resume</h3>
                <p className="text-sm text-gray-600">
                  Keep your profile current
                </p>
              </button>
              <button className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-left">
                <TrendingUp className="h-6 w-6 text-purple-600 mb-2" />
                <h3 className="font-medium text-gray-900">Skill Assessment</h3>
                <p className="text-sm text-gray-600">Test your abilities</p>
              </button>
              <button className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-left">
                <MessageSquare className="h-6 w-6 text-orange-600 mb-2" />
                <h3 className="font-medium text-gray-900">Career Advice</h3>
                <p className="text-sm text-gray-600">Get expert guidance</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default MainContent;
