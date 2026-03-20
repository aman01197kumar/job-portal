import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DashboardAccess from "./dashboards/DashboardAccess";
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
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { addUsername } from "./redux/userInfo";
// import JobSeekerForm from "./forms/JobSeekerForm";
import OnboardingSteps from "./features/OnboardingSteps";

const App = () => {
  const { user_token } = useSelector(state => state.userInfo);
  // Derive token immediately from redux (preferred) or localStorage (fallback).
  const token = user_token || localStorage.getItem("token");
  
  return (
    // <BrowserRouter>
    //   <Routes>
    //     {/* Public Routes */}
    //     <Route
    //       path="/"
    //       element={
    //         !userData?.token ? (
    //           <UserLogin />
    //         ) : !userData?.user_type ? (
    //           <Navigate to="/feature-selection" replace />
    //         ) : (
    //           <Navigate to="/dashboard" replace />
    //         )
    //       }
    //     />

    //     <Route
    //       path="/feature-selection"
    //       element={!userData?.token ? <FeatureSelection /> : <Navigate to="/dashboard" />}
    //     />

    //     {/* Shared Protected Routes */}
    //     <Route element={<ProtectedRoute userData={userData} />}>
    //       {/* Accessible by Both Roles */}
    //       <Route
    //         path="/feature-selection"
    //         element={<FeatureSelection user={userData?.user} />}
    //       />

    //       <Route
    //         path="/jobseeker"
    //         element={<JobSeekerForm user={userData?.user} />}
    //       />
    //       {/* <Route
    //         path="/recruiter"
    //         element={<Recruit />}
    //       /> */}
    //       <Route
    //         path="/dashboard"
    //         element={<Dashboard userData={userData} />}
    //       />
    //       <Route path="/career-advice" element={<CareerAdvice />} />

    //       <Route
    //         path="/user-profile/:username"
    //         element={
    //           <ProfilePage token={userData?.token} userId={userData?.userId} />
    //         }
    //       />

    //       {/* Admin Only Routes */}
    //       <Route element={<AdminProtectedRoute userData={userData} />}>
    //         <Route
    //           path="/admin/job-posting"
    //           element={<JobPosting userId={userData?.userId} />}
    //         />
    //         <Route
    //           path="recruiter/dashboard"
    //           element={<JobPosted userid={userData?.userId} />}
    //         />
    //       </Route>

    //       {/* Job Seeker Only Routes */}
    //       <Route element={<JobSeekerProtectedRoute userData={userData} />}>
    //         <Route
    //           path="/application-sent"
    //           element={<ApplicationSent userid={userData?.userId} />}
    //         />
    //         <Route path="/job-details/:id" element={<ViewJobDescription />} />
    //       </Route>
    //     </Route>
    //   </Routes>
    // </BrowserRouter>

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
        {/* <Route path="/" element = {<Dashboard/>}/> */}
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

          <Route path="/dashboard" element={<DashboardAccess token={token} />} />
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
