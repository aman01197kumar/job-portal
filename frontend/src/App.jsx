import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import UserLogin from "./screens/UserLogin";
import Signup from "./screens/Signup";
import JobPosting from "./Employer/screens/JobPosting";
import ViewJobDescription from "./User/screens/ViewJobDescription";
import JobPosted from "./Employer/screens/JobPosted";
import { ProfilePage } from "./screens/Profile";
import ApplicationSent from "./User/screens/ApplicationSent";
import CareerAdvice from "./utilities/components/CareerAdvice";
import { useDispatch } from "react-redux";
import { addUsername } from "./redux/userInfo";
import ProtectedRoute from "./utilities/components/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();

  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const getUserData = () => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Failed to parse userData:", error);
        return null;
      }
    }
    return null;
  };

  const userData = getUserData();

  dispatch(addUsername(userData?.username));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !userData?.token ? <UserLogin /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/signup"
          element={!userData?.token ? <Signup /> : <Navigate to="/dashboard" />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute userData={userData} />}>
          <Route
            path="/dashboard"
            element={<Dashboard userData={userData} />}
          />
          <Route
            path="/admin/job-posting"
            element={<JobPosting userId={userData?.userId} />}
          />
          <Route path="/job-details/:id" element={<ViewJobDescription />} />
          <Route
            path="/admin/stats"
            element={<JobPosted userid={userData?.userId} />}
          />
          <Route
            path="/user-profile/:username"
            element={
              <ProfilePage token={userData?.token} userId={userData?.userId} />
            }
          />
          <Route
            path="application-sent"
            element={<ApplicationSent userid={userData?.userId} />}
          />
          <Route path="/career-advice" element={<CareerAdvice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
