import React, { useState } from "react";
import signup from "../assets/imgs/signup.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL, END_POINTS } from "../assets/END_POINTS";

const Signup = () => {
  const [userSignupDetails, setUserSignupDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
    user: '',
  })
  const [confirmPassword, setConfirmPassword] = useState("");


  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    
    if (
      !userSignupDetails?.first_name?.trim() ||
      !userSignupDetails?.last_name?.trim() ||
      !userSignupDetails?.email?.trim() ||
      !userSignupDetails?.phone_number?.trim() ||
      !userSignupDetails?.password?.trim() ||
      !confirmPassword?.trim() ||
      !userSignupDetails?.password?.trim()
    ) {
      toast.error("Please fill all the fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userSignupDetails?.email?.trim())) {
      toast.error("Email is not in proper format.");
      return;
    }

    if (!/^\d{10}$/.test(userSignupDetails?.phone_number?.trim())) {
      toast.error("Contact number must be exactly 10 digits.");
      return;
    }

    if (userSignupDetails?.password?.trim().length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (userSignupDetails?.password?.trim() !== confirmPassword?.trim()) {
      toast.error("Passwords do not match.");
      return;
    }

    try {

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
      toast.error(err?.response?.data?.message)
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
            value={userSignupDetails?.first_name}
            onChange={(e) => setUserSignupDetails(prev => ({ ...prev, first_name: e.target.value }))}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={userSignupDetails?.last_name}
            onChange={(e) => setUserSignupDetails(prev => ({ ...prev, last_name: e.target.value }))}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email"
            value={userSignupDetails?.email}
            onChange={(e) => setUserSignupDetails(prev => ({ ...prev, email: e.target.value }))}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={userSignupDetails?.phone_number}
            onChange={(e) => setUserSignupDetails(prev => ({ ...prev, phone_number: e.target.value }))}
            className="input-field"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={userSignupDetails?.password}
              onChange={(e) => setUserSignupDetails(prev => ({ ...prev, password: e.target.value }))}
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
            value={userSignupDetails?.user}
            onChange={(e) => setUserSignupDetails(prev => ({ ...prev, user: e.target.value }))}
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

        <Toaster />
      </div>
    </div>
  );

};

export default Signup;
