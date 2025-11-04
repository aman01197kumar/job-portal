import { useSelector } from "react-redux";
import StatusCard from "./StatusCard";
import { useEffect, useState } from "react";
import axios from "axios";
import {  END_POINTS } from "../../assets/END_POINTS";

const StatusCards = ({ userId }) => {
  const [totalApplications, setTotalApplications] = useState(0);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const fetchStatusCards = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/${END_POINTS.STATUS_CARDS}/${userId}`
      );
      setTotalApplications(response?.data?.totalAppliedJobs);
    } catch (error) {
      console.log("Error fetching status cards:", error);
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
    </div>
  );
};

export default StatusCards;
