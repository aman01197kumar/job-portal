import {
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Node.js",
  "Responsive Design",
  "RESTful APIs",
  "Version Control (Git)",
  "Database Management (MongoDB)",
  "Database Management (SQL)",
  "Debugging & Browser Dev Tools",
];

const UserProfileEdit = ({ isModalOpen, setIsModalOpen, email }) => {
  const [userProfile, setUserProfile] = useState({
    user_image: null,
    full_name: "",
    user_desciption: "",
    skills: [],
    resume: null,
  });
  const [preview, setPreview] = useState(null);
  const [personName, setPersonName] = useState([]);

  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUserProfile((prev) => ({ ...prev, resume: file }));
    }
  };
  const { user_image, full_name, user_desciption, skills, resume } =
    userProfile;

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    if (file) {
      setUserProfile((prev) => ({ ...prev, user_image: file }));
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
    setUserProfile((prev) => ({ ...prev, skills: value }));
  };

  const saveChangesHandler = async () => {
    const formdata = new FormData();

    if (userProfile.user_image) {
      formdata.append("user_img", userProfile.user_image);
    }
    if (userProfile.resume) {
      formdata.append("resume", userProfile.resume);
    }

    formdata.append("full_name", userProfile.full_name);
    formdata.append("description", userProfile.user_desciption);
    formdata.append("skills", userProfile.skills.join(","));

    try {
      const response = await axios.put(
        `http://localhost:3000/update?email=${email}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response?.data);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-[75%] p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-semibold">Edit Profile</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 align-items-center">
                {user_image ? (
                  <div className="flex-shrink-0">
                    <img
                      src={preview}
                      alt="user-profile"
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div>
                    <div
                      className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer text-center"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Upload Image
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />

                <div className="flex-1 space-y-4">
                  <TextField
                    label="Full Name"
                    fullWidth
                    variant="outlined"
                    value={full_name}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        full_name: e.target.value,
                      }))
                    }
                  />

                  <TextField
                    sx={{ mt: 4 }}
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={user_desciption}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        user_desciption: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <FormControl sx={{ mt: 1, width: "100%" }}>
                <InputLabel id="demo-multiple-name-label">Skills</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Skills" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {skills.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ mt: 5, width: "100%" }}>
                <label id="demo-multiple-name-label">Upload Resume</label>
                <input
                  type="file"
                  className="border p-3 rounded w-full"
                  placeholder="upload resume"
                  onChange={(e) => handleResumeChange(e)}
                />
              </FormControl>
              <div className="text-right pt-2">
                <button
                  onClick={saveChangesHandler}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileEdit;
