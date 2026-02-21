import { useState } from "react";

const Resume = () => {
  const [resumeFile, setResumeFile] = useState(null);

  const [formData, setFormData] = useState({
    headline: "",
    summary: "",
    skills: [{ name: "", rating: 3 }],
    itSkills: [{ name: "", level: "Intermediate" }],
    projects: [{ title: "", techStack: "", description: "" }],
    certifications: [{ name: "", issuer: "" }]
  });

  // ---------------- FILE HANDLER ----------------
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.includes("pdf") && !file.type.includes("word")) {
      alert("Only PDF or DOC files are allowed");
      return;
    }

    setResumeFile(file);
  };

  const removeResume = () => setResumeFile(null);

  // ---------------- GENERIC HANDLER ----------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------------- ARRAY FIELD HANDLER ----------------
  const handleArrayChange = (section, index, field, value) => {
    const updated = [...formData[section]];
    updated[index][field] = value;
    setFormData({ ...formData, [section]: updated });
  };

  const addField = (section, newObject) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], newObject]
    });
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = () => {
    console.log({ ...formData, resumeFile });
  };

  return (
    <div className="m-8">

      <h2 className="text-xl font-semibold mb-4 text-indigo-600">Resume Details</h2>

      {/* PROFILE HEADLINE */}
      <div className="flex flex-col gap-y-7">

      <div className="shadow-lg p-4 rounded-xl">
        <label className="block text-sm font-medium mb-1">
          Profile Headline
        </label>
        <input
          type="text"
          name="headline"
          value={formData.headline}
          onChange={handleChange}
          placeholder="Senior Frontend Developer | React Specialist"
          className="inputClass"
        />
      </div>

      {/* PROFILE SUMMARY */}
      <div className="shadow-lg p-4 rounded-xl">
        <label className="block text-sm font-medium mb-1">
          Profile Summary
        </label>
        <textarea
          name="summary"
          rows={4}
          value={formData.summary}
          onChange={handleChange}
          placeholder="Write a short professional summary..."
          className="inputClass"
        />
      </div>

      {/* KEY SKILLS */}
      <div className="shadow-lg p-4 rounded-xl">
        <h3 className="block text-sm font-medium mb-1">Key Skills</h3>

        {formData.skills.map((skill, index) => (
          <div key={index} className="flex gap-4 mb-3">
            <input
              type="text"
              placeholder="Skill (React, Java...)"
              value={skill.name}
              onChange={(e) =>
                handleArrayChange("skills", index, "name", e.target.value)
              }
              className="inputClass"
            />

            <input
              type="number"
              min="1"
              max="5"
              value={skill.rating}
              onChange={(e) =>
                handleArrayChange("skills", index, "rating", e.target.value)
              }
              className="w-20 p-2 rounded-lg"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            addField("skills", { name: "", rating: 3 })
          }
          className="text-indigo-600 font-medium text-sm hover:text-indigo-700 transition"
        >
          + Add Skill
        </button>
      </div>

      {/* PROJECTS */}
      <div className="shadow-lg p-4 rounded-xl">
        <h3 className="block text-sm font-medium mb-1">Projects</h3>

        {formData.projects.map((project, index) => (
          <div key={index} className="space-y-3 mb-4">
            <input
              type="text"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) =>
                handleArrayChange("projects", index, "title", e.target.value)
              }
              className="inputClass"
            />

            <input
              type="text"
              placeholder="Tech Stack (React, Node, MongoDB)"
              value={project.techStack}
              onChange={(e) =>
                handleArrayChange("projects", index, "techStack", e.target.value)
              }
              className="inputClass"
            />

            <textarea
              rows={3}
              placeholder="Project Description"
              value={project.description}
              onChange={(e) =>
                handleArrayChange("projects", index, "description", e.target.value)
              }
              className="inputClass"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            addField("projects", {
              title: "",
              techStack: "",
              description: ""
            })
          }
          className="text-indigo-600 text-sm font-medium"
        >
          + Add Project
        </button>
      </div>

      {/* CERTIFICATIONS */}
      <div className="shadow-lg p-4 rounded-xl">
        <h3 className="block text-sm font-medium mb-1">Certifications</h3>

        {formData.certifications.map((cert, index) => (
          <div key={index} className="flex gap-4 mb-3">
            <input
              type="text"
              placeholder="Certification Name"
              value={cert.name}
              onChange={(e) =>
                handleArrayChange("certifications", index, "name", e.target.value)
              }
              className="inputClass"
            />

            <input
              type="text"
              placeholder="Issuer"
              value={cert.issuer}
              onChange={(e) =>
                handleArrayChange("certifications", index, "issuer", e.target.value)
              }
              className="inputClass"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            addField("certifications", { name: "", issuer: "" })
          }
          className="text-indigo-600 text-sm font-medium"
        >
          + Add Certification
        </button>
      </div>

      {/* FILE UPLOAD */}
      <div className="shadow-lg p-4 rounded-xl">
        <h3 className="block text-sm font-medium mb-1">Upload Resume</h3>

        {!resumeFile ? (
          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-sm text-gray-600">
              Click to upload your resume
            </p>
          </label>
        ) : (
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <p className="font-medium">{resumeFile.name}</p>
              <p className="text-xs text-gray-500">
                {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <button
              type="button"
              onClick={removeResume}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* SUBMIT */}
      <div className="flex justify-center pt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
        >
          Submit Resume Details
        </button>
      </div>
    </div>
      </div>
  );
};

export default Resume;