import React, { useState } from "react";
import signup from "../assets/imgs/signup.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL, END_POINTS } from "../assets/END_POINTS";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState("");
  const [lastName, setLastName] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    if (
      !fname?.trim() ||
      !email?.trim() ||
      !contactNumber?.trim() ||
      !password?.trim() ||
      !confirmPassword?.trim() ||
      !user
    ) {
      toast.error("Please fill all the fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email?.trim())) {
      toast.error("Email is not in proper format.");
      return;
    }

    if (!/^\d{10}$/.test(contactNumber?.trim())) {
      toast.error("Contact number must be exactly 10 digits.");
      return;
    }

    if (password?.trim().length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (password?.trim() !== confirmPassword?.trim()) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const userSignupDetails = {
        full_name: fname + " " + lastName,
        email: email,
        password: password,
        contactNumber: contactNumber,
        user: user.toLowerCase(),
      };

      const response = await axios.post(
        `${BASE_URL}/${END_POINTS.SIGNUP}`,
        userSignupDetails,
        {
          headers: {
            "Content-Type": "application/json", // must be proper case
          },
        }
      );


      if (response.status == 409) {
        toast.error("somthing went wrong");
        return;
      }

      if (response?.data?.status === 401) {
        toast.error(response?.data?.message);
      } else if (response?.data?.status === 409) {
        toast.error(response?.data?.message);
      }

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${signup})` }}
    >
      <div className="bg-white bg-opacity-90 w-full max-w-3xl p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="input-field"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pr-10"
            />
            {showPassword ? (
              <VisibilityOffIcon
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <VisibilityOutlinedIcon
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />
          <select
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="input-field"
          >
            <option value="">User Type</option>
            <option value="employer">Employer</option>
            <option value="job-seeker">Job Seeker</option>
          </select>
        </div>

        <div className="mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Sign in
          </span>
        </div>

        <button
          type="submit"
          onClick={onSubmitHandler}
          className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>

        <ToastContainer />
      </div>
    </div>
  );

};

export default Signup;
