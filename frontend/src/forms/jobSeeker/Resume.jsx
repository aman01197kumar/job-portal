import { useState } from "react";

const Resume = () => {
  const [resume, setResume] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (
      !file.type.includes("pdf") &&
      !file.type.includes("word")
    ) {
      alert("Only PDF or DOC files are allowed");
      return;
    }

    setResume(file);
  };

  const removeResume = () => {
    setResume(null);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Resume</h3>

      {!resume ? (
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
          <p className="text-xs text-gray-400 mt-1">
            PDF or DOC (Max 5MB)
          </p>
        </label>
      ) : (
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="font-medium">{resume.name}</p>
            <p className="text-xs text-gray-500">
              {(resume.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <button
            type="button"
            onClick={removeResume}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          //   onClick={submitEducation}      
          className="w-fit px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          Submit the details
        </button>
      </div>
    </div>
  );
};

export default Resume;
