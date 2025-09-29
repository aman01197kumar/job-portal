import { useSelector } from 'react-redux'
import StatusCard from './StatusCard'

const StatusCards = () => {

  const sentApplications = useSelector(state => state?.sentApplication?.selectedJobApplications)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatusCard
        title="Applications Sent"
        value={sentApplications.length}
        url="application-sent"
      />
      <StatusCard
        title="Profile Views"
        value="156"
        url="profile-views"
      />
      <StatusCard
        title="Saved Jobs"
        value="18"
        url="saved-jobs"
      />
      <StatusCard
        title="Interview Invites"
        value="3"
        url="interview-invites"
      />
    </div>
  )
}

export default StatusCards