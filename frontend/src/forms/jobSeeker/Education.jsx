import  { useState } from "react";
import NextButton from "../../components/NextButton";
import { educationData } from "../../assets/data/education";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { addEducationDetails } from "../../redux/userInfo";
import DateRangePicker from "../../components/Calender";

const Education = ({ setActiveStep }) => {
  const [educationCount, setEducationCount] = useState(1);
  const [educationDates, setEducationDates] = useState([
    { from: null, to: null }
  ]);

  const dispatch = useDispatch()
  const {user_onboarding_credentials} = useSelector(state=>state.userInfo)
  console.log(user_onboarding_credentials,'fniknik')

  const addEducation = () => {
    setEducationCount(prev => prev + 1);

    setEducationDates(prev => [
      ...prev,
      { from: null, to: null }
    ]);
  };


  const educationDetailsSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const educationArray = [];

    for (let i = 0; i < educationCount; i++) {

      const degree = formData.get(`degree-${i}`);
      const institution = formData.get(`institution-${i}`);
      const field = formData.get(`field-${i}`);
      const fromDate = educationDates[i]?.from;
      const toDate = educationDates[i]?.to;

      if (!degree || !institution || !field || !fromDate || !toDate) {
        toast.error("Please fill all education details");
        return;
      }

      educationArray.push({
        degree,
        institution,
        field,
        startYear: fromDate.toISOString(),
        endYear: toDate.toISOString(),
        isEducationDetailsFilled: true
      });
    }

    dispatch(addEducationDetails(educationArray));
    setActiveStep(prev => prev + 1);
  };



  return (
    <form onSubmit={educationDetailsSubmitHandler}>
      <section className="m-8">
        <h3 className="text-xl font-semibold mb-4 text-indigo-600">
          Education Details
        </h3>

        {[...Array(educationCount)].map((_, index) => (
          <div
            key={index}
            className="mb-6 rounded-xl border border-gray-100 p-6 shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-4">

              {/* Degree */}
              <select
                name={`degree-${index}`}
                className='inputClass'
              >
                <option value="">Select Course</option>
                {educationData.map((item, i) => (
                  <option key={i} value={item.courseName}>
                    {item.courseName}
                  </option>
                ))}
              </select>

              {/* Institution */}
              <select
                name={`institution-${index}`}
                className="inputClass"
              >
                <option value="">Select Institution</option>
                {educationData.map((item, i) => (
                  <option key={i} value={item.collegeName}>
                    {item.collegeName}
                  </option>
                ))}
              </select>

              {/* Field */}
              <select
                name={`field-${index}`}
                className="inputClass"
              >
                <option value="">Select Field</option>
                {educationData.map((item, i) => (
                  <option key={i} value={item.fieldOfStudy}>
                    {item.fieldOfStudy}
                  </option>
                ))}
              </select>

              {/* Years */}
              <DateRangePicker
                fromValue={educationDates[index]?.from}
                toValue={educationDates[index]?.to}
                onFromChange={(date) => {
                  const updated = [...educationDates];
                  updated[index].from = date;
                  setEducationDates(updated);
                }}
                onToChange={(date) => {
                  const updated = [...educationDates];
                  updated[index].to = date;
                  setEducationDates(updated);
                }}
              />


            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addEducation}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          + Add another education
        </button>
      </section>

      <NextButton />
      <Toaster />
    </form>
  );
};

export default Education;
