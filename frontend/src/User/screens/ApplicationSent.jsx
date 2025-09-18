import { Briefcase, Building2, CalendarDays, Eye, IndianRupee } from "lucide-react";
import { Header } from "../../utilities/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, END_POINTS } from "../../assets/END_POINTS";
import Loader from "../../utilities/components/Loader";
import { useDispatch } from "react-redux";
import { addJobDescription } from "../../redux/jobDescription";


const NoJobsFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <p className="text-xl font-semibold">No Applications Sent</p>
            <p className="text-sm mt-2">Start applying to jobs to view your applications here.</p>
        </div>
    );

}
const ApplicationSent = ({ userid }) => {

    const [appliedJobs, setAppliedJobs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const fetchAppliedJobs = async () => {
        try {
            setIsLoading(true)

            const response = await axios.get(
                `${BASE_URL}/${END_POINTS.GET_ALL_APPLICATIONS}/${userid}`,
            );
            setAppliedJobs(response?.data?.data?.sentApplications)
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAppliedJobs()
        document.title = 'Oppmore | Sent Applications'
    }, [])


    return (
        <>
            <Header />
            {
                isLoading ? <Loader width={10} height={10} /> : appliedJobs.length === 0 ? <NoJobsFound /> : (

                    <div className="p-6 space-y-6 max-w-4xl mx-auto">
                        {appliedJobs.map((application) => (
                            <div
                                key={application?._id}
                                className="rounded-xl border bg-white p-5 shadow-md hover:shadow-lg transition duration-300"
                            >
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                                    {/* Left: Job Info */}
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <Briefcase className="w-5 h-5 text-blue-600" />
                                            {application?.job_profile}
                                        </h2>

                                        <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-gray-400" />
                                            {application?.organisation_name}
                                        </p>

                                        {application?.ctc && (
                                            <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                                                <IndianRupee className="w-4 h-4 text-gray-400" />
                                                {application?.ctc}
                                            </p>
                                        )}


                                        {application?.appliedOn && (
                                            <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                                                <CalendarDays className="w-4 h-4 text-gray-400" />
                                                Applied on {new Date(application?.appliedOn).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>

                                    {/* Right: Status */}
                                    {/* <div className="mt-2 md:mt-0">
                                <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${app.statusColor || "bg-gray-400"}`}
                                >
                                {app.status}
                                </span>
                                </div> */}
                                </div>
                                <a
                                    href={`/job-details/${application?._id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 mt-3"
                                    onClick={() => dispatch(addJobDescription(application))}
                                >
                                    <Eye size={16} />
                                    View Details
                                </a>
                            </div>
                        ))}
                    </div>
                )
            }
        </>
    );
};

export default ApplicationSent;
