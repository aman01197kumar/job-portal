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
import JobSeekerForm from "./Forms/JobSeekerForm";
import { useSelector } from "react-redux";

const App = () => {

  const { user_token } = useSelector(state => state.userInfo)
  const token = user_token || localStorage.getItem('token')

  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <UserLogin />}
        />

        <Route
          path="/signup"
          element={token ? <Navigate to="/dashboard" /> : <Signup />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          <Route path="/dashboard" element={<Dashboard token={token} />} />
          <Route path="/career-advice" element={<CareerAdvice />} />
          <Route path="/feature-selection" element={<FeatureSelection />} />
          <Route path="/jobseeker" element={<JobSeekerForm />} />
          <Route path="/user-profile/:username" element={<ProfilePage />} />

          {/* Admin Only */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/job-posting" element={<JobPosting />} />
            <Route path="/recruiter/dashboard" element={<JobPosted />} />
          </Route>

          {/* Job Seeker Only */}
          <Route element={<JobSeekerProtectedRoute />}>
            <Route path="/application-sent" element={<ApplicationSent />} />
            <Route path="/job-details/:id" element={<ViewJobDescription />} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;