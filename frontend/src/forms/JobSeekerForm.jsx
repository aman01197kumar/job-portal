import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const JobSeekerForm = () => {

    const { user } = useSelector(state => state.userInfo)
    const [formData, setFormData] = useState({
        fullName: user.username,
        email: user.user_email,
        phone: "",
        role: "",
        experience: "",
        location: "",
        skills: "",
        summary: "",
        availability: "Immediate",
        resume: null,
        user_type: user.user_type
    });
    const navigate = useNavigate()



    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData,'form')
        navigate('/', { replace: true });

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Find Your Dream Job 🚀
                </h2>
                <p className="text-gray-500 mb-8">
                    Fill in your details and let recruiters find you.
                </p>

                {/* Personal Info */}
                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-indigo-600">
                        Personal Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            className="input"
                            disabled={!!formData.fullName}

                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            className="input"
                            disabled={!!formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            className="input"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Current Location"
                            className="input"
                            onChange={handleChange}
                        />
                    </div>
                </section>

                {/* Professional Info */}
                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-indigo-600">
                        Professional Details
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="role"
                            placeholder="Desired Job Role"
                            className="input"
                            onChange={handleChange}
                        />

                        <select
                            name="experience"
                            className="input"
                            onChange={handleChange}
                        >
                            <option value="">Experience Level</option>
                            <option value="Fresher">Fresher</option>
                            <option value="1-3 Years">1–3 Years</option>
                            <option value="3-5 Years">3–5 Years</option>
                            <option value="5+ Years">5+ Years</option>
                        </select>
                        <input
                            type="text"
                            value={formData.user_type}
                            className="input"
                            disabled={!!formData.user_type}

                            onChange={handleChange}
                        />
                    </div>


                    <textarea
                        name="summary"
                        rows="4"
                        placeholder="Professional Summary (Tell us what makes you special)"
                        className="input mt-4"
                        onChange={handleChange}
                    />
                </section>

                {/* Skills */}
                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-indigo-600">
                        Skills
                    </h3>

                    <input
                        type="text"
                        name="skills"
                        placeholder="e.g. React, Node.js, MongoDB, AWS"
                        className="input"
                        onChange={handleChange}
                    />
                    <p className="text-sm text-gray-400 mt-1">
                        Separate skills with commas
                    </p>
                </section>

                {/* Availability & Resume */}
                <section className="mb-8 grid md:grid-cols-2 gap-4">
                    <select
                        name="availability"
                        className="input"
                        onChange={handleChange}
                    >
                        <option value="Immediate">Immediate</option>
                        <option value="15 Days">15 Days</option>
                        <option value="30 Days">30 Days</option>
                        <option value="60 Days">60 Days</option>
                    </select>

                    <input
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        className="input file:mr-4 file:py-2 file:px-4 file:rounded-lg
            file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        onChange={handleChange}
                    />
                </section>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-lg transition"
                >
                    Submit Profile
                </button>
            </form>

            {/* Tailwind utility */}
            <style>
                {`
          .input {
            width: 100%;
            padding: 0.75rem;
            border-radius: 0.75rem;
            border: 1px solid #e5e7eb;
            outline: none;
          }
          .input:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 2px rgba(99,102,241,0.2);
          }
        `}
            </style>
        </div>
    );
};

export default JobSeekerForm;
