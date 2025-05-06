import React, { useState } from "react";
import signup from "../assets/imgs/signup.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast, ToastContainer } from "react-toastify";

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
      alert("Please fill all the fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email?.trim())) {
      alert("Email is not in proper format.");
      return;
    }

    if (!/^\d{10}$/.test(contactNumber?.trim())) {
      alert("Contact number must be exactly 10 digits.");
      return;
    }

    if (password?.trim() !== confirmPassword?.trim()) {
      alert("Passwords do not match.");
      return;
    }

    const userSignupDetails = {
      firstName: fname,
      lastName: lastName,
      email: email,
      password: password,
      contactNumber: contactNumber,
      user: user.toLowerCase(),
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        userSignupDetails
      );

      if (response.status == 409) {
        console.log("somthing went wrong abhihsek");
      }

      if (response?.data?.status === 401) {
        toast.error(response?.data?.message);
      } else if (response?.data?.status === 409) {
        toast.error(response?.data?.message);
        navigate("/");
      }
      toast.success(response?.data?.message);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {" "}
      {/* Full-screen flex container */}
      <div className="flex w-full md:w-3/4 max-w-5xl bg-white p-8 rounded-lg shadow-lg align-items-center">
        <div className="w-1/3 md:w-2/3 flex justify-center items-center">
          <img
            src={signup}
            alt="signup"
            className="max-w-full max-h-full object-cover"
          />
        </div>
        <div className="w-2/3 md:w-3/4 p-6 border rounded-lg shadow-sm">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              value={email}
              placeholder="Email Address"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
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
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              placeholder="Confirm Password"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                value={fname}
                placeholder="First Name"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                value={contactNumber}
                placeholder="Contact Number"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div className="relative z-0 w-full mb-2 group">
              <select
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className=" border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option selected="">User</option>
                <option value="employer">Employer</option>
                <option value="job-seeker">Job Seeker</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            Already have an account?{" "}
            <span
              className="text-blue-600 underline cursor-pointer font-medium"
              onClick={() => navigate("/")}
            >
              Sign in
            </span>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onSubmitHandler}
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Signup;
