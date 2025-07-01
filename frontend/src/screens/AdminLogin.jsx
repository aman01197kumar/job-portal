import React, { useState } from "react";
import login from "../assets/imgs/login.jpg";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const AdminLogin = ({ setLoggedBy }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userLoginHandler = () => {
    if (!email || !password) {
      alert("please enter email and password");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email?.trim())) {
      alert("Email is not in proper format.");
      return;
    }

    if (password.length < 8) {
      alert("password must be of atleast 8 characters");
      return;
    }
    setLoggedBy("employer");
    navigate("dashboard");
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex w-full md:w-3/4 max-w-5xl bg-white p-8 rounded-lg shadow-lg">
          <div className="w-1/3 md:w-2/3 flex justify-center items-center bg-cover bg-center sm:w-full sm:h-full sm:bg-[url('../assets/login.jpg')]">
            <img
              src={login}
              alt="Login"
              className="max-w-full max-h-full object-cover hidden sm:block"
            />
          </div>

          <div className="w-2/3 md:w-3/4 p-6 border rounded-lg shadow-sm">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="p-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@xyz.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="..............."
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            </div>
            <div className="flex justify-between  mb-5">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    defaultValue=""
                    className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <label className="text-blue-600 underline cursor-pointer text-sm font-medium">
                Forgot Password?
              </label>
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
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={userLoginHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
