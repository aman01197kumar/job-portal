import React, { useEffect, useState } from "react";
import login from "../assets/imgs/login.jpg";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../utilities/components/Loader";
import { END_POINTS } from "../assets/END_POINTS";


const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loggedBy, setLoggedBy] = useState({ email: "", password: "" });
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { email, password } = loggedBy;

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialLogin,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleCredentialLogin = async (response) => {

    const res = await axios.get("http://localhost:3000/google-auth", {
      headers: {
        Authorization: `Bearer ${response.credential}`,
      },
    });

    if (res.data.needsOnboarding) {
      localStorage.setItem(
        "userData",
        JSON.stringify({
          token: response.credential,
          // role: null,
          user: res.data.user,
        })
      );

      window.location.href = "/feature-selection"
    } else {
      localStorage.setItem(
        "userData",
        JSON.stringify({
          token: response.credential,
          // role: res.data.user.user_type,
          user: res.data.user,
        })
      );


      window.location.href = "/"
    }

  };
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
      const response = await axios.post(
        `${BASE_URL}/${END_POINTS.LOGIN}`,
        user
      );

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
          username: data.username,
          profileImage: data.profileImage,
        });

        localStorage.setItem("userData", userData);
        toast.success("Login successful!");
        navigate("/");
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden m-4">

          {/* Image Section */}
          <div className="hidden md:block md:w-1/2">
            <img
              src={login}
              alt="Login"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">


            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="name@xyz.com"
                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) =>
                  setLoggedBy({ ...loggedBy, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full p-2 pr-10 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) =>
                    setLoggedBy({ ...loggedBy, password: e.target.value })
                  }
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityOutlinedIcon />}
                </span>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex justify-between items-center mb-4 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                Remember me
              </label>
              <span className="text-blue-600 cursor-pointer">
                Forgot password?
              </span>
            </div>

            {/* Submit */}
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium mb-4"
              onClick={userLoginHandler}
            >
              {isLoading ? <Loader width={5} height={5} /> : "Sign In"}
            </button>

            {/* Google Sign In */}
            <div className="flex justify-center mb-4">
              <div id="googleSignInDiv"></div>
            </div>

            {/* Signup */}
            <p className="text-sm text-center">
              Don’t have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer font-medium"
                onClick={() => navigate("signup")}
              >
                Create Account
              </span>
            </p>
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );

};

export default UserLogin;
