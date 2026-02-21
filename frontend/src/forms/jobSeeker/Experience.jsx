import { useState } from "react";
import NextButton from "../../components/NextButton";
import DateRangePicker from "../../components/Calender";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { addExperienceAction } from "../../redux/userInfo";

const Experience = ({ setActiveStep }) => {
  const [experienceCount, setExperienceCount] = useState(1);
  const [experienceDates, setExperienceDates] = useState([
    { from: null, to: null }
  ]);

  const dispatch = useDispatch();

  const addExperience = () => {
    setExperienceCount((prev) => prev + 1);
    setExperienceDates((prev) => [...prev, { from: null, to: null }]);
  };

  const {user_onboarding_credentials} = useSelector(state=>state.userInfo)
  const experienceSubmitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target);
    const experienceArray = [];

    for (let i = 0; i < experienceCount; i++) {

      const organization_name = formData.get(`organization_name-${i}`);
      const job_profile = formData.get(`job_profile-${i}`);
      const description = formData.get(`description-${i}`);
      const fromDate = experienceDates[i]?.from;
      const toDate = experienceDates[i]?.to;

      if (!organization_name || !job_profile || !description || !fromDate || !toDate) {
        toast.error("Please fill all experience details");
        return;
      }

      experienceArray.push({
        organization_name,
        job_profile,
        description,
        startYear: fromDate.toISOString(),
        endYear: toDate.toISOString(),
        isExperienceFilled: true
      });
    }

    
    dispatch(addExperienceAction(experienceArray))
    // setActiveStep(prev => prev + 1)
  }
  console.log(user_onboarding_credentials,'user')

  return (
    <form className="m-8" onSubmit={experienceSubmitHandler}>

      <h3 className="text-xl font-semibold mb-4 text-indigo-600">
        Work Experience
      </h3>

      {[...Array(experienceCount)].map((_, index) => (
        <div
          key={index}
          className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name={`organization_name-${index}`}
                placeholder="Google, Amazon..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500/30 
                           focus:border-indigo-500 transition"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Role / Designation
              </label>
              <input
                type="text"
                name={`job_profile-${index}`}
                placeholder="Software Engineer"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500/30 
                           focus:border-indigo-500 transition"
              />
            </div>

            {/* Date Range */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Duration
              </label>
              <div className="flex flex-col md:flex-row gap-4">
                <DateRangePicker
                  fromValue={experienceDates[index]?.from}
                  toValue={experienceDates[index]?.to}
                  onFromChange={(date) => {
                    const updated = [...experienceDates];
                    updated[index].from = date;
                    setExperienceDates(updated);
                  }}
                  onToChange={(date) => {
                    const updated = [...experienceDates];
                    updated[index].to = date;
                    setExperienceDates(updated);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Responsibilities / Achievements
            </label>
            <textarea
              rows={3}
              name={`description-${index}`}
              placeholder="Describe your role and achievements..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/30 
                         focus:border-indigo-500 transition"
            />
          </div>
        </div>
      ))}

      {/* Add Button */}
      <button
      type="button"
        onClick={addExperience}
        className="text-indigo-600 font-medium hover:text-indigo-700 transition"
      >
        + Add Another Company
      </button>

      {/* Next Button */}
      <div className="mt-8">
        <NextButton />
      </div>
      <Toaster />
    </form>
  );
};

export default Experience;
