import StatusCard from "./StatusCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { END_POINTS } from "../../assets/END_POINTS";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const StatusCards = () => {
  const [totalApplications, setTotalApplications] = useState(0);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { user_token } = useSelector(state => state.userInfo)

  const fetchStatusCards = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/${END_POINTS.STATUS_CARDS}`,
        {
          headers: {
            Authorization: `Bearer ${user_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      setTotalApplications(response?.data?.totalAppliedJobs);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchStatusCards();
  }, []);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatusCard
        title="Applications Sent"
        value={totalApplications}
        url="application-sent"
      />
      
      <StatusCard title="Profile Views" value="156" url="profile-views" />
      <StatusCard title="Saved Jobs" value="18" url="saved-jobs" />
      <StatusCard title="Interview Invites" value="3" url="interview-invites" />
      <Toaster/>
    </div>
  );
};

export default StatusCards;
