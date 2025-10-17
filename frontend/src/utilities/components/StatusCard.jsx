import { useNavigate } from "react-router-dom"

const StatusCard = (stat) => {
    const navigate = useNavigate()
    return (
        <div
            key={stat.title}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            onClick={() => navigate(`/${stat.url}`)}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                        {stat.value}
                    </p>
                    <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>

            </div>
        </div>
    )
}

export default StatusCard