import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, END_POINTS } from "../../assets/END_POINTS";
import {FileText} from "lucide-react";
import { Header } from "../../utilities/components/Header";
import StatusCards from "../../utilities/components/StatusCards";
import toast, { Toaster } from 'react-hot-toast';
import SavedJobs from "../../utilities/components/SavedJobs";
import Notifications from "../../utilities/components/Notifications"
import JobCards from "../../utilities/components/JobCards";
import { useNavigate } from "react-router-dom";

const MainContent = ({ userId }) => {
  const [dashboardJobPosted, setDashboardJobPosted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allJobs, setAllJobs] = useState([])
  const navigate = useNavigate()


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
    document.title = "Oppmore | Home"
  }, []);



  const jobAppliedHandler = async (application) => {

    try {
      const payload = {
        jobId: application?._id,
        organisation_name: application?.organisation_name,
        job_profile: application?.job_profile,
        ctc: application?.ctc,
        description: application?.job_description,
        job_location: application?.job_location,
        job_type: application?.job_type,
      };

      if (!userId) {
        toast.error("User ID not found. Please log in again.");
        navigate('/login')
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/${END_POINTS.APPLY_JOB}/${userId}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { success, message } = response?.data;

      if (success) {
        toast.success(message);
        window.location.reload()
      }
    } catch (err) {
      toast.error(err.message);
    }
  };


  return (
    <>
      <Header setDashboardJobPosted={setDashboardJobPosted} allJobs={allJobs} />
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
                <JobCards
                  dashboardJobPosted={dashboardJobPosted}
                  loading={loading}
                  jobAppliedHandler={jobAppliedHandler}
                />
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