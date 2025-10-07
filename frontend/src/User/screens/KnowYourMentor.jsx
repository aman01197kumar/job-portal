import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Header } from "../../utilities/components/Header";

const KnowYourMentor = () => {

    const { adviser } = useSelector(state => state.adviserDetails)
    const { adviser_name, adviser_description, adviser_skills, adviser_pic, profile } = adviser

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 border md:w-1/2 w-4/5 m-auto rounded-t-2xl mt-10">
                {/* Mentor Image */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg">
                    <img
                        src={adviser_pic}
                        alt={adviser_name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Mentor Profile Info */}
                <h1 className="mt-4 text-2xl font-bold text-gray-800">{adviser_name}</h1>
                <p className="text-sm text-gray-500">{profile}</p>

                {/* Short Description */}
                <p className="mt-4 text-center max-w-lg text-gray-600">
                    {adviser_description}
                </p>

                {/* Skills Section */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {adviser_skills.map((skill, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Experience */}
                {/* <div className="mt-6 bg-white shadow-md rounded-lg p-4 w-full max-w-md text-center">
                <h2 className="text-lg font-semibold text-gray-800">Experience</h2>
                <p className="text-gray-600 mt-2">{experience}</p>
                </div> */}
                <a
                    href='#'
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
                >
                    Connect with Mentor
                </a>
            </div>
        </>

    );
};

export default KnowYourMentor;
