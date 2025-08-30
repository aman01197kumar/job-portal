import React, { useState } from "react";
import login from "../assets/imgs/login.jpg";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
// import { toast, ToastContainer } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
import Loader from "../components/Loader";
import { BASE_URL, END_POINTS } from "../assets/END_POINTS";
import { responseGoogle } from "../utils/googleAuth";


const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loggedBy, setLoggedBy] = useState({ email: "", password: "" });
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = loggedBy;

  const userLoginHandler = async () => {
    if (!email || !password) {
      toast.warn("Please enter email and password");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.warn("Email is not in proper format.");
      return;
    }

    if (password.length < 8) {
      toast.warn("Password must be at least 8 characters");
      return;
    }

    const user = { email, password };

    try {
      setIsloading(true);
      const response = await axios.post(`${BASE_URL}/${END_POINTS.LOGIN}`, user);

      const { data } = response;

      if (data.status === 400 || data.status === 401) {
        toast.warn(data.message);
        return;
      }

      if (data.status === 404) {
        toast.error(data.message);
        return;
      }

      if (data.status === 200) {
        const userData = JSON.stringify({
          userId: data.userId,
          user_type: data.user,
          token: data.token,
          email: data.email,
        });

        localStorage.setItem("userData", userData);
        toast.success("Login successful!");
        navigate('/')
        window.location.reload();
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
      console.log(err);
    } finally {
      setIsloading(false);
    }
  };


  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="relative flex h-100 md:h-auto flex-col-reverse md:flex-row w-full m-3 md:m-auto p-7 md:p-auto md:w-3/4 max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">

          {/* Image Section */}
          <div className="w-full md:w-1/2 md:h-auto">
            <img
              src={login}
              alt="Login"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-30 md:hidden"></div>
          </div>

          {/* Form Section */}
          <div className="absolute md:static top-0 left-0 w-full md:w-1/2 h-full p-6 md:p-8 z-10 flex flex-col justify-center bg-white/90 backdrop-blur-sm animate-fadeIn rounded-lg md:rounded-none shadow-lg md:shadow-none">
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="p-2 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                placeholder="name@xyz.com"
                value={email}
                onChange={(e) => setLoggedBy({ ...loggedBy, email: e.target.value })}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Your password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="..............."
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5"
                  onChange={(e) => setLoggedBy({ ...loggedBy, password: e.target.value })}
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
            </div>

            <div className="flex justify-between mb-5">
              <div className="flex items-start">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded-sm focus:ring-3 focus:ring-blue-300"
                />
                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">
                  Remember me
                </label>
              </div>
              <span className="text-blue-600 underline cursor-pointer text-sm font-medium">
                Forgot Password?
              </span>
            </div>

            <div className="mb-3 text-sm">
              Don't have an account?{" "}
              <span
                className="text-blue-600 underline cursor-pointer font-medium"
                onClick={() => navigate("signup")}
              >
                Create Account
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="text-white flex justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 w-full focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={userLoginHandler}
              >
                {isLoading ? <Loader width={5} height={5} /> : "Submit"}
              </button>

              <div className="text-center text-sm text-gray-500">or</div>

              <GoogleLogin
                onSuccess={responseGoogle}
                onError={responseGoogle}
              />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default UserLogin;
