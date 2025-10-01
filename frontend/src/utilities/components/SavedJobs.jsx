import {
    Bookmark,
    MapPin,
    Building,
    DollarSign,
} from "lucide-react";

const SavedJobs = () => {
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
    return (
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
    )
}

export default SavedJobs