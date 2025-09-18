
const StatusCards = (stat) => {
  return (
    <div
      key={stat.title}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
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
        <div className={`${stat.color} p-3 rounded-lg`}>
          <stat.icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )
}

export default StatusCards