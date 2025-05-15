import { useEffect, useRef, useState } from "react";
import UserProfileEdit from "../components/UserProfileEdit";
import axios from "axios";
import { esbuildVersion } from "vite";
const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Node.js",
  "Responsive Design",
  "RESTful APIs",
  "Version Control (Git)",
  "Database Management (MongoDB)",
  "Database Management (SQL)",
  "Debugging & Browser Dev Tools",
];

export default function UserProfile({ email }) {
  const [userProfile, setUserProfile] = useState({
    user_image: null,
    user_name: "Aman",

    user_desciption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut justo libero. Fusce et finibus tellus. Aliquam et nibh nibh. Donec tristique placerat odio. Sed elementum imperdiet odio in porttitor. Nunc est arcu, iaculis ac elit quis, viverra sollicitudin nisi. Aliquam et elit quis est faucibus mollis.",
    skills: [],
  });
  const { user_image, user_name, user_desciption } = userProfile;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserData = async () => {
    try {
      if (email) {
        const response = await axios.get(
          `http://localhost:3000/getuser?email=${email}`
        );
        console.log(response?.data);
      }
      // else console.log('nooo')
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <main className="px-4 py-6 ">
      <div className="max-w-screen-md flex gap-y-5 flex-col mx-auto p-6 shadow-md rounded-lg bg-white">
        <header className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <img
              src={user_image}
              alt="user-profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold">{user_name}</h2>
            <p className="text-gray-500 text-sm mt-1">{email}</p>
            <p className="text-gray-600">{user_desciption}</p>
          </div>
        </header>

        <ul className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill) => (
            <li
              key={skill}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {skill}
            </li>
          ))}
        </ul>
        <span className="text-blue-600 underline font-semibold w-fit cursor-pointer">
          Resume.pdf
        </span>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded w-30"
        >
          Edit Profile
        </button>
      </div>
      <UserProfileEdit
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        email={email}
      />
    </main>
  );
}
