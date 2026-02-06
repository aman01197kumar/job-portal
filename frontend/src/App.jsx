import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import JobPosting from "./Employer/screens/JobPosting";
import ViewJobDescription from "./User/screens/ViewJobDescription";
import JobPosted from "./Employer/screens/JobPosted";
import { ProfilePage } from "./screens/Profile";
import ApplicationSent from "./User/screens/ApplicationSent";
import CareerAdvice from "./utilities/components/CareerAdvice";
import ProtectedRoute from "./utilities/components/ProtectedRoute";
import AdminProtectedRoute from "./protectedRoutes/AdminProjectedRoute";
import JobSeekerProtectedRoute from "./protectedRoutes/JobseekerProtectedRoutes";
import FeatureSelection from "./features/FeatureSelection";
import Signup from "./auth/Signup";
import UserLogin from "./auth/UserLogin";
import { useEffect, useState } from "react";
import JobSeekerForm from "./Forms/JobSeekerForm";
import { useDispatch } from "react-redux";
import { addUsername } from "./redux/userInfo";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");

    storedUser && setUserData(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  userData && dispatch(addUsername(userData.username))

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            !userData?.token ? (
              <UserLogin />
            ) : !userData?.user_type ? (
              <Navigate to="/feature-selection" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route
          path="/signup"
          element={!userData?.token ? <Signup /> : <Navigate to="/dashboard" />}
        />

        {/* Shared Protected Routes */}
        <Route element={<ProtectedRoute userData={userData} />}>
          {/* Accessible by Both Roles */}
          <Route
            path="/feature-selection"
            element={<FeatureSelection user={userData?.user} />}
          />
          <Route
            path="/jobseeker"
            element={<JobSeekerForm user={userData?.user} />}
          />
          {/* <Route
            path="/recruiter"
            element={<Recruit />}
          /> */}
          <Route
            path="/dashboard"
            element={<Dashboard userData={userData} />}
          />
          <Route path="/career-advice" element={<CareerAdvice />} />

          <Route
            path="/user-profile/:username"
            element={
              <ProfilePage token={userData?.token} userId={userData?.userId} />
            }
          />

          {/* Admin Only Routes */}
          <Route element={<AdminProtectedRoute userData={userData} />}>
            <Route
              path="/admin/job-posting"
              element={<JobPosting userId={userData?.userId} />}
            />
            <Route
              path="recruiter/dashboard"
              element={<JobPosted userid={userData?.userId} />}
            />
          </Route>

          {/* Job Seeker Only Routes */}
          <Route element={<JobSeekerProtectedRoute userData={userData} />}>
            <Route
              path="/application-sent"
              element={<ApplicationSent userid={userData?.userId} />}
            />
            <Route path="/job-details/:id" element={<ViewJobDescription />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
