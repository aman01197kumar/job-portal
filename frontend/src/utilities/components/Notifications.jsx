import {
    Search,
    MessageSquare,
    Eye,
} from "lucide-react";

const Notifications = () => {
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
    return (
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
    )
}

export default Notifications