import React, { useState } from "react";
import {
  Edit3,
  MapPin,
  Calendar,
  Globe,
  Github,
  Linkedin,
  Mail,
  Briefcase,
  Building,
  Users,
  Star,
  Award,
} from "lucide-react";

import { EditProfileModal } from "../components/UserProfile/EditProfileModal";
import { techStacks } from "../assets/tech_stacks";
import {Header} from "../components/Header";

// Sample user data
const sampleUser = {
  id: "1",
  username: "johndoe",
  email: "john.doe@example.com",
  fullName: "John Doe",
  bio: "Full-stack developer with 5 years of experience building scalable web applications. Passionate about clean code, user experience, and continuous learning.",
  location: "San Francisco, CA",
  website: "https://johndoe.dev",
  github: "johndoe",
  linkedin: "johndoe",
  jobTitle: "Senior Software Engineer",
  company: "Tech Corp",
  yearsOfExperience: 5,
  profileImage:
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  techStacks: ["react", "nodejs", "typescript", "python", "aws", "docker"],
  availabilityStatus: "available",
  joinDate: "2021-03-15",
};

export const ProfilePage = () => {
  const [user, setUser] = useState(sampleUser);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSaveProfile = (updatedUser) => {
    setUser(updatedUser);
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-yellow-500";
      case "unavailable":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case "available":
        return "Available for work";
      case "busy":
        return "Currently busy";
      case "unavailable":
        return "Not available";
      default:
        return "Status unknown";
    }
  };

  const getUserTechStacks = () => {
    return techStacks.filter((tech) => user.techStacks.includes(tech.id));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="relative px-8 pb-8">
              <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-6">
                <div className="relative mb-4 md:mb-0">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center">
                      <Users size={48} className="text-gray-400" />
                    </div>
                  )}
                  <div
                    className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white ${getAvailabilityColor(
                      user.availabilityStatus
                    )}`}
                  ></div>
                </div>

                <div className="flex-1 md:ml-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        {user.fullName}
                      </h1>
                      <p className="text-xl text-gray-600 mb-2">
                        @{user.username}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${getAvailabilityColor(
                            user.availabilityStatus
                          )}`}
                        ></div>
                        {getAvailabilityText(user.availabilityStatus)}
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                      <Edit3 size={16} className="mr-2" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {user.jobTitle && (
                  <div className="flex items-center text-gray-700">
                    <Briefcase size={16} className="mr-2 text-blue-500" />
                    <span className="text-sm">{user.jobTitle}</span>
                  </div>
                )}
                {user.company && (
                  <div className="flex items-center text-gray-700">
                    <Building size={16} className="mr-2 text-blue-500" />
                    <span className="text-sm">{user.company}</span>
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center text-gray-700">
                    <MapPin size={16} className="mr-2 text-blue-500" />
                    <span className="text-sm">{user.location}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-700">
                  <Calendar size={16} className="mr-2 text-blue-500" />
                  <span className="text-sm">
                    {user.yearsOfExperience} years exp.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">
                  {user.bio || "No bio available."}
                </p>
              </div>

              {/* Tech Stacks */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Tech Stacks
                </h2>
                {getUserTechStacks().length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {getUserTechStacks().map((tech) => (
                      <span
                        key={tech.id}
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white ${tech.color} shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No tech stacks added yet.</p>
                )}
              </div>

              {/* Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Stats</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <Star className="text-blue-500" size={24} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">4.9</p>
                    <p className="text-sm text-gray-500">Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <Award className="text-green-500" size={24} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-sm text-gray-500">Projects</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <Users className="text-purple-500" size={24} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">245</p>
                    <p className="text-sm text-gray-500">Connections</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <Calendar className="text-orange-500" size={24} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {user.yearsOfExperience}
                    </p>
                    <p className="text-sm text-gray-500">Years</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Contact Info
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail size={16} className="text-gray-500 mr-3" />
                    <a
                      href={`mailto:${user.email}`}
                      className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                    >
                      {user.email}
                    </a>
                  </div>
                  {user.website && (
                    <div className="flex items-center">
                      <Globe size={16} className="text-gray-500 mr-3" />
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                      >
                        Website
                      </a>
                    </div>
                  )}
                  {user.github && (
                    <div className="flex items-center">
                      <Github size={16} className="text-gray-500 mr-3" />
                      <a
                        href={`https://github.com/${user.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                      >
                        GitHub
                      </a>
                    </div>
                  )}
                  {user.linkedin && (
                    <div className="flex items-center">
                      <Linkedin size={16} className="text-gray-500 mr-3" />
                      <a
                        href={`https://linkedin.com/in/${user.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                      >
                        LinkedIn
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Member Since */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Member Since
                </h2>
                <p className="text-gray-700">
                  {new Date(user.joinDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        <EditProfileModal
          user={user}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      </div>
    </>
  );
};
