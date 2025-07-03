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
  Clock,
  MapPin,
  Building,
  DollarSign,
  Star,
  Eye,
  Send,
  ExternalLink,
  IndianRupee
} from "lucide-react";
import { Header } from "./Header";

const MainContent = () => {
  const [dashboardJobPosted, setDashboardJobPosted] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

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

  const applyJobHandler = (job) => {
    if (appliedJobs.some((item) => item._id === job._id)) return;
    setAppliedJobs((prev) => [...prev, job]);
  };

  const isApplied = (jobId) => appliedJobs.some((item) => item._id === jobId);

  const savedJobs = [
    {
      id: 1,
      title: "Full Stack Developer",
      company: "Innovation Labs",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      postedDate: "1 day ago",
    },
    {
      id: 2,
      title: "React Developer",
      company: "WebFlow Co.",
      location: "Remote",
      salary: "$90k - $120k",
      postedDate: "3 days ago",
    },
    {
      id: 3,
      title: "Software Engineer",
      company: "CloudTech",
      location: "New York, NY",
      salary: "$110k - $140k",
      postedDate: "5 days ago",
    },
  ];

  const notifications = [
    {
      id: 1,
      type: "application",
      message: "Your application for Frontend Developer at TechCorp was viewed",
      time: "2 hours ago",
      icon: Eye,
    },
    {
      id: 2,
      type: "message",
      message: "New message from Design Studio recruiter",
      time: "4 hours ago",
      icon: MessageSquare,
    },
    {
      id: 3,
      type: "job_match",
      message: "5 new jobs match your preferences",
      time: "1 day ago",
      icon: Search,
    },
  ];

  const dashboardStats = [
    {
      title: "Applications Sent",
      value: "24",
      change: "+3 this week",
      icon: Send,
      color: "bg-blue-500",
    },
    {
      title: "Profile Views",
      value: "156",
      change: "+12 this week",
      icon: Eye,
      color: "bg-green-500",
    },
    {
      title: "Saved Jobs",
      value: "18",
      change: "+5 this week",
      icon: Bookmark,
      color: "bg-purple-500",
    },
    {
      title: "Interview Invites",
      value: "3",
      change: "+1 this week",
      icon: Star,
      color: "bg-orange-500",
    },
  ];

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
            <div className="mt-4 sm:mt-0">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Find New Jobs
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStats.map((stat) => (
              <div
                key={stat.title}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
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
                      <Loader />
                    ) : (
                      dashboardJobPosted.map((application) => (
                        <div
                          key={application.id}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          {/* Job Info */}
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

                          {/* Actions */}
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
                              onClick={() => applyJobHandler(application)}
                              disabled={isApplied(application._id)}
                              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                                isApplied(application._id)
                                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                  : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              }`}
                            >
                              <ExternalLink size={16} />
                              {isApplied(application._id)
                                ? "Applied"
                                : "Apply Now"}
                            </button>

                            {/* Status Badge */}
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${application.statusColor}`}
                            >
                              {application.status}
                            </span>
                          </div>
                        </div>
                      ))
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
    </>
  );
};

export default MainContent;
