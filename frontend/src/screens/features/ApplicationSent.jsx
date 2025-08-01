import { Briefcase, Building2, CalendarDays, IndianRupee } from "lucide-react";
import { useSelector } from "react-redux";
import { Header } from "../../components/Header";

const ApplicationSent = () => {
    const { selectedJobApplications } = useSelector(state => state.sentApplication)
    if (selectedJobApplications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p className="text-xl font-semibold">No Applications Sent</p>
                <p className="text-sm mt-2">Start applying to jobs to view your applications here.</p>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="p-6 space-y-6 max-w-4xl mx-auto">
                {selectedJobApplications.map((app) => (
                    <div
                        key={app.id}
                        className="rounded-xl border bg-white p-5 shadow-md hover:shadow-lg transition duration-300"
                    >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            {/* Left: Job Info */}
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-blue-600" />
                                    {app.job_profile}
                                </h2>

                                <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-gray-400" />
                                    {app.organisation_name}
                                </p>

                                {app.ctc && (
                                    <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                                        <IndianRupee className="w-4 h-4 text-gray-400" />
                                        {app.ctc}
                                    </p>
                                )}

                                
                                {app.appliedOn && (
                                <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                                <CalendarDays className="w-4 h-4 text-gray-400" />
                                Applied on {new Date(app.appliedOn).toLocaleDateString()}
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
                    </div>
                ))}
            </div>
        </>
    );
};

export default ApplicationSent;
