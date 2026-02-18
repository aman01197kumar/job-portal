import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserSelection } from "../redux/userInfo";

const FeatureSelection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const features = [
        {
            title: "I want a job",
            subtitle: "Find your next opportunity",
            description:
                "Create your profile, showcase your skills, and get hired by top companies.",
            icon: "💼",
            action: () => navigate("/onboarding"),
            gradient: "from-indigo-500 to-blue-500",
            user_type: "Job Seeker"
        },
        {
            title: "I provide jobs",
            subtitle: "Hire the right talent",
            description:
                "Post jobs, review candidates, and hire faster with smart filtering.",
            icon: "🏢",
            action: () => navigate("/recruiter/dashboard"),
            gradient: "from-emerald-500 to-teal-500",
            user_type: "recruiter"
        },
        {
            title: "I want to collaborate",
            subtitle: "Freelance & partnerships",
            description:
                "Connect with startups and teams for freelance, contract, or project-based work.",
            icon: "🤝",
            action: () => navigate("/collaborate"),
            gradient: "from-purple-500 to-pink-500",
            user_type: "collaborator"
        },
    ];

    const featureActionHandler = (item) => {
        //   const stored = JSON.parse(localStorage.getItem("userData"));

        const updated = {
            // ...stored,
            isOnboarding: true,
            user: {
                //   ...stored.user,
                user_type: item.user_type,
            },
        };

        //   localStorage.setItem("userData", JSON.stringify(updated));

        dispatch(addUserSelection(item.user_type))

        item.action();
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6">
            <div className="max-w-6xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                        How do you want to get started? 🚀
                    </h1>
                    <p className="mt-4 text-gray-500 text-lg">
                        Choose an option that best describes your goal.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => featureActionHandler(item)}
                            className="group cursor-pointer bg-white rounded-2xl shadow-lg p-8 
                         transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            {/* Icon */}
                            <div
                                className={`w-16 h-16 flex items-center justify-center text-3xl 
                            rounded-xl bg-gradient-to-r ${item.gradient} text-white mb-6`}
                            >
                                {item.icon}
                            </div>

                            {/* Text */}
                            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                                {item.title}
                            </h2>
                            <p className="text-sm text-indigo-600 font-medium mb-3">
                                {item.subtitle}
                            </p>
                            <p className="text-gray-500 mb-6">
                                {item.description}
                            </p>

                            {/* CTA */}
                            <button
                                className={`inline-flex items-center gap-2 font-semibold
                            text-indigo-600 group-hover:text-indigo-700`}
                            >
                                Get Started
                                <span className="transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeatureSelection;
