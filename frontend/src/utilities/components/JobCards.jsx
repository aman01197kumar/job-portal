import { Building, Eye, ExternalLink, IndianRupee } from "lucide-react";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { addJobDescription } from "../../redux/jobDescription";

const JobCards = ({
  dashboardJobPosted,
  loading,
  jobAppliedHandler,
  buttonLoadingId,

}) => {

  const dispatch = useDispatch()

  const viewDetailHandler = (application) => {
    dispatch(addJobDescription(application))

  }
  return (
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
                  onClick={() => viewDetailHandler(application)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  <Eye size={16} />
                  View Details
                </a>

                <button
                  onClick={() => jobAppliedHandler(application)}

                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200
                      bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"

                >
                  {buttonLoadingId === application?._id ? (
                    <Loader width={5} height={5} />
                  ) : (
                    <>
                      <ExternalLink size={16} />
                      Apply Now

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
  );
};

export default JobCards;
