import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, END_POINTS } from "../../assets/END_POINTS";
import Loader from "../../utilities/components/Loader";
import {
  FileText,
  Building,
  Eye,
  ExternalLink,
  IndianRupee
} from "lucide-react";
import { Header } from "../../utilities/components/Header";
import StatusCards from "../../utilities/components/StatusCards";
import toast, { Toaster } from 'react-hot-toast';
import { addAppliedJobs } from "../../redux/sentApplications";
import { useDispatch } from "react-redux";
import SavedJobs from "../../utilities/components/SavedJobs";
import Notifications from "../../utilities/components/Notifications"

const MainContent = ({ userId }) => {
  const [dashboardJobPosted, setDashboardJobPosted] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoadingId, setButtonLoadingId] = useState(null);
  const[allJobs,setAllJobs] = useState([])
  const dispatch = useDispatch()


  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/${END_POINTS.JOBS}/${userId}`, {
        "content-type": "application/json",
      });

      setDashboardJobPosted(response?.data?.data);
      setAllJobs(response?.data?.data)
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  document.title = "Oppmore | Home"


  const jobAppliedHandler = async (application) => {
    const jobId = application._id;
    if (isApplied(jobId)) return;

    setButtonLoadingId(jobId);

    try {
      const payload = {
        organisation_name: application?.organisation_name,
        job_profile: application?.job_profile,
        ctc: application?.ctc,
        description: application?.job_description,
        job_location: application?.job_location,
        job_type: application?.job_type,
      };

      if (!userId) {
        toast.error("User ID not found. Please log in again.");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/${END_POINTS.APPLICATION_SUBMITTED}/${userId}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { status, message } = response?.data;

      if (status === 200) {
        toast.success(message);
        fetchJobApplications();
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.error("Apply error:", err);
      toast.error("Something went wrong.");
    } finally {
      setButtonLoadingId(null);
    }
  };

  const fetchJobApplications = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/${END_POINTS.GET_ALL_APPLICATIONS}/${userId}`
      );


      if (response?.data?.status === 404) {
        return toast.error(response?.data?.message || "No applications found");
      }

      const applications = response?.data?.data?.sentApplications || [];
      setAppliedJobs(applications);
      dispatch(addAppliedJobs(applications));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobApplications();
  }, []);

  const isApplied = (jobId) =>
    appliedJobs.some((item) => item._id === jobId);

  return (
    <>
      <Header setDashboardJobPosted={setDashboardJobPosted} allJobs = {allJobs}/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Grid */}
          <StatusCards />

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
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {loading ? (
                      <Loader width={10} height={10} />
                    ) : dashboardJobPosted.length > 0 ? (
                      dashboardJobPosted.map((application) => (
                        <div
                          key={application?._id}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="flex-1 mb-4 sm:mb-0">
                            <h3 className="font-semibold text-gray-900">
                              {application?.job_profile}
                            </h3>
                            <p className="text-gray-600 text-sm flex items-center mt-1">
                              <Building className="h-4 w-4 mr-1" />
                              {application?.organisation_name}
                            </p>
                            <p className="text-gray-600 text-sm flex items-center mt-1">
                              <IndianRupee className="h-4 w-4 mr-1" />
                              {application?.ctc}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <a
                              href={`/job-details/${application?._id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                            >
                              <Eye size={16} />
                              View Details
                            </a>

                            <button
                              onClick={() => jobAppliedHandler(application)}
                              disabled={
                                isApplied(application?._id) ||
                                buttonLoadingId === application?._id
                              }
                              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 ${isApplied(application?._id)
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                }`}
                            >
                              {buttonLoadingId === application?._id ? (
                                <Loader width={5} height={5} />
                              ) : (
                                <>
                                  <ExternalLink size={16} />
                                  {isApplied(application?._id)
                                    ? "Applied"
                                    : "Apply Now"}
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center">No Jobs listed!!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <SavedJobs />
              <Notifications />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default MainContent;