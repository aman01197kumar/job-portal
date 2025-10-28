import { useState } from 'react';
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
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/imgs/oppmore_logo.png'



const AdminHeader = ({ setDashboardJobPosted, allJobs }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
    window.location.reload();
  };

  const searchJobHandler = (e) => {
    const searchValue = e.target.value.toLowerCase();

    if (!searchValue) {
      // Reset to full list
      setDashboardJobPosted(allJobs);
      return;
    }

    const filteredJobs = allJobs.filter((job) =>
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
              onClick={() => navigate('/')}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {/* Jobs Dropdown */}
            

            {/* Navigation Links */}
            <div onClick={()=>navigate('/admin/job-posting')} className=" cursor-pointer text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Post Jobs
            </div>
            <div onClick={()=>navigate('/admin/stats')} className="cursor-pointer text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Statistics
            </div>
            <div onClick={()=>navigate('/admin/assign-mentors')} className="cursor-pointer text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Assign Mentors
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
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Profile"
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                        <p className="text-xs text-gray-500">Software Engineer</p>
                        <p className="text-xs text-green-600">Profile 85% complete</p>
                      </div>
                    </div>
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
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Software Engineer</p>
              </div>
            </div>


            {/* Account Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <a href="#" className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
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

export default AdminHeader