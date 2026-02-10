import { useState } from "react";
import NextButton from "../../components/NextButton";

const Experience = ({ setActiveStep }) => {
  const [experiences, setExperiences] = useState([
    {
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (index) => {
    if (experiences.length === 1) return;
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Work Experience</h3>

      {experiences.map((exp, index) => (
        <div
          key={index}
          className="mb-6 p-4 border rounded-lg relative"
        >
          {experiences.length > 1 && (
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="absolute top-2 right-2 text-red-500 text-sm"
            >
              Remove
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company Name"
              value={exp.company}
              onChange={(e) =>
                handleChange(index, "company", e.target.value)
              }
              className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            <input
              type="text"
              placeholder="Role / Designation"
              value={exp.role}
              onChange={(e) =>
                handleChange(index, "role", e.target.value)
              }
              className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            <input
              type="date"
              value={exp.startDate}
              onChange={(e) =>
                handleChange(index, "startDate", e.target.value)
              }
              className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            <input
              type="date"
              value={exp.endDate}
              onChange={(e) =>
                handleChange(index, "endDate", e.target.value)
              }
              className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

          </div>
          <textarea
            placeholder="Responsibilities / Achievements"
            value={exp.description}
            onChange={(e) =>
              handleChange(index, "description", e.target.value)
            }
            className="mt-4  w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            rows={3}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        + Add Another Company
      </button>
      <div>

      <NextButton/>
      </div>
    </div>
  );
};

export default Experience;
