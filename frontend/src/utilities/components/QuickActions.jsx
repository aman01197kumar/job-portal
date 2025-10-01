import {
    Search,
    FileText,
    MessageSquare,
    TrendingUp,
} from "lucide-react";

const QuickActions = () => {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-left">
                    <Search className="h-6 w-6 text-blue-600 mb-2" />
                    <h3 className="font-medium text-gray-900">Search Jobs</h3>
                    <p className="text-sm text-gray-600">
                        Find your next opportunity
                    </p>
                </button>
                <button className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-left">
                    <FileText className="h-6 w-6 text-green-600 mb-2" />
                    <h3 className="font-medium text-gray-900">Update Resume</h3>
                    <p className="text-sm text-gray-600">
                        Keep your profile current
                    </p>
                </button>
                <button className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-left">
                    <TrendingUp className="h-6 w-6 text-purple-600 mb-2" />
                    <h3 className="font-medium text-gray-900">Skill Assessment</h3>
                    <p className="text-sm text-gray-600">Test your abilities</p>
                </button>
                <button className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-left">
                    <MessageSquare className="h-6 w-6 text-orange-600 mb-2" />
                    <h3 className="font-medium text-gray-900">Career Advice</h3>
                    <p className="text-sm text-gray-600">Get expert guidance</p>
                </button>
            </div>
        </div>
    )
}

export default QuickActions