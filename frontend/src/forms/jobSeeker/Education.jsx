import React, { useState } from "react";
import NextButton from "../../components/NextButton";

const Education = ({ setActiveStep }) => {
  const [educationList, setEducationList] = useState([
    {
      degree: "",
      institution: "",
      field: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...educationList];
    updated[index][name] = value;
    setEducationList(updated);
  };

  const addEducation = () => {
    setEducationList([
      ...educationList,
      {
        degree: "",
        institution: "",
        field: "",
        startYear: "",
        endYear: "",
      },
    ]);
  };

  const submitEducation = (e) => {
    e.preventDefault();
    setActiveStep((prev) => prev + 1);
  };

  const inputClass =
    "w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

  return (
    <>
      <section className="m-8">
        <h3 className="text-xl font-semibold mb-4 text-indigo-600">
          Education Details
        </h3>

        {educationList.map((edu, index) => (
          <div
            key={index}
            className="mb-6 rounded-xl border border-gray-100 p-6 shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="degree"
                placeholder="Degree (e.g. B.Tech, MCA)"
                className={inputClass}
                value={edu.degree}
                onChange={(e) => handleChange(index, e)}
              />

              <input
                type="text"
                name="institution"
                placeholder="Institution / University"
                className={inputClass}
                value={edu.institution}
                onChange={(e) => handleChange(index, e)}
              />

              <input
                type="text"
                name="field"
                placeholder="Field of Study"
                className={inputClass}
                value={edu.field}
                onChange={(e) => handleChange(index, e)}
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="startYear"
                  placeholder="Start Year"
                  className={inputClass}
                  value={edu.startYear}
                  onChange={(e) => handleChange(index, e)}
                />

                <input
                  type="text"
                  name="endYear"
                  placeholder="End Year"
                  className={inputClass}
                  value={edu.endYear}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add More */}
        <button
          type="button"
          onClick={addEducation}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          + Add another education
        </button>
      </section>

      {/* Next Button */}
      <NextButton/>
    </>
  );
};

export default Education;
