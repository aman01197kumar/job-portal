import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import UserLogin from "./screens/UserLogin";
import Signup from "./screens/Signup";
import JobPosting from "./Employer/screens/JobPosting";
import ViewJobDescription from "./User/screens/ViewJobDescription";
import JobPosted from "./Employer/screens/JobPosted";
import { ProfilePage } from "./screens/Profile";
import ApplicationSent from "./User/screens/ApplicationSent";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
      } catch (error) {
        console.error("Failed to parse userData:", error);
      }
    }
  }, []);


  return (
    <GoogleOAuthProvider clientId="1731036921-prm09e148mv69jnpqtpnioe6tqisi8lr.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          {userData?.token ? (
            <Route
              path="/"
              element={<Dashboard user_type={userData?.user_type} userId={userData?.userId} />}
            />
          ) : (
            <Route path="/" element={<UserLogin />} />
          )}

          <Route path="/signup" element={<Signup />} />

          <Route
            path="/admin/job-posting"
            element={<JobPosting userId={userData?.userId} />}
          />
          <Route path="/job-details/:id" element={<ViewJobDescription />} />
          <Route
            path="/job-posted"
            element={<JobPosted userid={userData?.userId} />}
          />
          <Route path="/user-profile" element={<ProfilePage />} />
          <Route path="application-sent" element={<ApplicationSent userid={userData?.userId} />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
