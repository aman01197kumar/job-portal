import React, { useState } from "react";
import NextButton from "../../components/NextButton";
import { educationData } from "../../assets/data/education";
import Calender from "../../components/Calender";

const Education = ({ setActiveStep }) => {
  const [educationCount, setEducationCount] = useState(1);

  const addEducation = () => {
    setEducationCount(prev => prev + 1);
  };

  const educationDetailsSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const educationArray = [];

    for (let i = 0; i < educationCount; i++) {
      educationArray.push({
        degree: formData.get(`degree-${i}`),
        institution: formData.get(`institution-${i}`),
        field: formData.get(`field-${i}`),
        startYear: formData.get(`startYear-${i}`),
        endYear: formData.get(`endYear-${i}`)
      });
    }

    console.log(educationArray);

    // setActiveStep(prev => prev + 1);
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
              <Calender />

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
    </form>
  );
};

export default Education;
