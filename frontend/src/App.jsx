import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import UserLogin from "./screens/UserLogin";
import Signup from "./screens/Signup";
import UserProfile from "./screens/UserProfile";
import JobPosting from "./screens/JobPosting";
import ViewJobDescription from "./screens/ViewJobDescription";
import JobPosted from "./screens/JobPosted";

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
    <BrowserRouter>
      <Routes>
        {userData?.token ? (
          <Route
            path="/"
            element={<Dashboard user_type={userData?.user_type} />}
          />
        ) : (
          <Route path="/" element={<UserLogin />} />
        )}

        <Route path="signup" element={<Signup />} />

        <Route
          path="/admin/job-posting"
          element={<JobPosting userId={userData?.userId} />}
        />
        <Route
          path="job-details/:id"
          element={<ViewJobDescription/>}
        />
        <Route
          path="job-posted"
          element={<JobPosted userid={userData?.userId} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
