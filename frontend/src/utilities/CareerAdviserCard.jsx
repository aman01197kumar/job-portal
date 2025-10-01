import React from 'react'

const CareerAdviserCard = ({ adviser_name, adviser_description, adviser_skills, adviser_pic, profile }) => {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4 m-auto mt-10">
        

                <div className="flex flex-col items-center pb-10">
                    <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src={adviser_pic}
                        alt="Bonnie image"
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        {adviser_name}
                    </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {profile}
                    </span>
                    
                    <div className="flex mt-4 md:mt-6 gap-x-3">
                        <a
                            href="#"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Connect with Mentor
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Know your Mentor
                        </a>
                    </div>
                </div>
            </div>
    )
}

export default CareerAdviserCard