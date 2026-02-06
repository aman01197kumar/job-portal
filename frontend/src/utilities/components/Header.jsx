import { useState } from "react";
import {
  Menu,
  X,
  Search,
  Briefcase,
  BookOpen,
  Users,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Building,
  Heart,
  FileText,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/oppmore_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { firstCharacters } from "../custom_modules/firstCharacter";

const jobCategories = [
  {
    id: 1,
    name: "Technology",
    description: "Software, IT, and tech roles",
    href: "#",
    icon: Briefcase,
    count: "2,340 jobs",
  },
  {
    id: 2,
    name: "Design",
    description: "UI/UX, Graphic, and Product Design",
    href: "#",
    icon: BookOpen,
    count: "890 jobs",
  },
  {
    id: 3,
    name: "Marketing",
    description: "Digital marketing and growth roles",
    href: "#",
    icon: Users,
    count: "1,250 jobs",
  },
  {
    id: 4,
    name: "Sales",
    description: "Business development and sales",
    href: "#",
    icon: Building,
    count: "980 jobs",
  },
];

const quickActions = [
  { name: "Saved Jobs", href: "#", icon: Heart, count: "12" },
  { name: "Applications", href: "#", icon: FileText, count: "8" },
  { name: "Messages", href: "#", icon: MessageSquare, count: "3" },
];

export const Header = ({ setDashboardJobPosted, allJobs }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();
  const { username } = useSelector((state) => state.userInfo);
  const { profileImage } = useSelector((state) => state.userInfo);

  console.log(`${BASE_URL}/${profileImage}`, 'pro')

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
    window.location.reload();
  };

  const searchJobHandler = (e) => {
    const searchValue = e.target.value.toLowerCase();

    if (!searchValue) {
      // Reset to full list
      setDashboardJobPosted(allJobs);
      return;
    }

    const filteredJobs = allJobs.filter(
      (job) =>
        job.job_profile.toLowerCase().includes(searchValue) ||
        job.organisation_name.toLowerCase().includes(searchValue) // Optional: search by company too
    );

    setDashboardJobPosted(filteredJobs);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt="logo"
              className="w-28 mt-3 object-contain cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {/* Jobs Dropdown */}
            <div className="relative">
              <button
                onClick={() => setJobsDropdownOpen(!jobsDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Find Jobs
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${jobsDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {jobsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      Browse by Category
                    </h3>
                    <div className="space-y-2">
                      {jobCategories.map((category) => (
                        <a
                          key={category.id}
                          href={category.href}
                          className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex-shrink-0">
                            <category.icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {category.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {category.description}
                            </p>
                            <p className="text-xs text-blue-600 font-medium">
                              {category.count}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-200 p-4">
                    <a
                      href="#"
                      className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                    >
                      View All Jobs
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Companies
            </a>
            <a
              href="career-advice"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Career Advice
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 text-sm"
                onChange={(e) => searchJobHandler(e)}
              />
            </div>
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </button>
            <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {profileImage ? (
                  <img
                    src={`${BASE_URL}/${profileImage}`}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-200 ">
                    {firstCharacters(username)}
                  </div>
                )}
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      {profileImage ? (
                        <img
                          src={`${BASE_URL}/${profileImage}`}
                          alt="Profile"
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-200 ">
                          {firstCharacters(username)}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {username}
                        </p>
                        <p className="text-xs text-gray-500">
                          Software Engineer
                        </p>
                        <p className="text-xs text-green-600">
                          Profile 85% complete
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <span
                      onClick={()=>navigate(`/user-profile/${username}`)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <User className="h-4 w-4 mr-3" />
                      View Profile
                    </span>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Account Settings
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <FileText className="h-4 w-4 mr-3" />
                      Resume Builder
                    </a>
                  </div>

                  <div className="border-t border-gray-200 py-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search jobs..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {/* Profile Section */}
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
              {profile_img ? (
                <img
                  src={`${BASE_URL}/${profile_img}`}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-200 ">
                  {firstCharacters(userInfo)}
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">{userInfo}</p>
                <p className="text-xs text-gray-500">Software Engineer</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4 py-4 border-b border-gray-200">
              {quickActions.map((action) => (
                <a
                  key={action.name}
                  href={action.href}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="relative">
                    <action.icon className="h-6 w-6 text-gray-600" />
                    {action.count && (
                      <span className="absolute -top-2 -right-2 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {action.count}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 mt-1">
                    {action.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Find Jobs
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Companies
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Salary Guide
              </a>
              <a
                href="career-advice"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Career Advice
              </a>
            </div>

            {/* Account Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <a
                href={`/user-profile/${userInfo}`}
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <User className="h-5 w-5 mr-3" />
                View Profile
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for dropdowns */}
      {(jobsDropdownOpen || profileDropdownOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setJobsDropdownOpen(false);
            setProfileDropdownOpen(false);
          }}
        />
      )}
    </header>
  );
};
