import React, { createContext, useState } from "react";
import Signup from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProfile from "./screens/UserProfile";
import JobPosting from "./screens/JobPosting";
import Sidebar from "./components/Sidbar";
import Header from "./components/Header";
import ViewJobDescription from "./screens/ViewJobDescription";
import Login from "./screens/Login";
import AdminDashboard from "./screens/AdminDashboard";
import JobTable from "./components/JobTable";

const dashboardJobPosted = [
  {
    company_name: "Apple",
    job_profile: "Software Development",
    ctc: "30LPA",
    job_type: "Full Time",
    job_location: "Banglore",
    job_description: "cvbnjhgcgvhbjnkjhvctdtfyguhjvhcgvhbnk",
  },
  {
    company_name: "Google",
    job_profile: "Product Manager",
    ctc: "35LPA",
    job_type: "Full Time",
    job_location: "Delhi",
    job_description: "tyhgvbnjhbvcgfhytgbvcxhnmkjvghbvcxdrfghv",
  },
  {
    company_name: "Microsoft",
    job_profile: "Cloud Engineer",
    ctc: "40LPA",
    job_type: "Full Time",
    job_location: "Mumbai",
    job_description: "vbnkjhgfghvbnmncbhytgfcvnmjhgfcfvnmbvhg",
  },
  {
    company_name: "Amazon",
    job_profile: "Data Scientist",
    ctc: "45LPA",
    job_type: "Full Time",
    job_location: "Chennai",
    job_description: "gfchvbnmjhvcxgnhbhvghgcfvbnmfhvghvbnjm",
  },
  {
    company_name: "IBM",
    job_profile: "Cyber Security Analyst",
    ctc: "32LPA",
    job_type: "Full Time",
    job_location: "Hyderabad",
    job_description: "ytvbnmhgfyhgbnmjvhgfcfghbnkjmnkfjghjm",
  },
  {
    company_name: "Facebook",
    job_profile: "UX/UI Designer",
    ctc: "38LPA",
    job_type: "Full Time",
    job_location: "Pune",
    job_description: "bnjhfgnvbnmnbvnfhbvfnhgchmnbvfmnvjgn",
  },
  {
    company_name: "Netflix",
    job_profile: "Backend Developer",
    ctc: "50LPA",
    job_type: "Full Time",
    job_location: "Kolkata",
    job_description: "cvbmnkjbmnkjmgbvfcdhbcjvnkjvgfcmnkgvh",
  },
  {
    company_name: "Twitter",
    job_profile: "Machine Learning Engineer",
    ctc: "48LPA",
    job_type: "Full Time",
    job_location: "Noida",
    job_description: "bvnmnxgcvbnjhgfvhgfnmkjbfvghjmcnxgfhb",
  },
  {
    company_name: "Adobe",
    job_profile: "Web Developer",
    ctc: "28LPA",
    job_type: "Full Time",
    job_location: "Gurgaon",
    job_description: "mvnmnkfhbgvcxmnfgvcjnkcvnmghvgfnbvfkg",
  },
  {
    company_name: "Oracle",
    job_profile: "Database Administrator",
    ctc: "36LPA",
    job_type: "Full Time",
    job_location: "Ahmedabad",
    job_description: "bmnkjhbvghvnfdxvgbvnfbghmnkjfgnbcvghg",
  },
];

export const JobContext = createContext();
const App = () => {
  const [loggedBy, setLoggedBy] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  <Header setOpenDrawer={setOpenDrawer} />;
  return (
    <BrowserRouter>
      <Sidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <JobContext.Provider value={dashboardJobPosted}>
        <Routes>
          <Route path="/" element={<Login setLoggedBy={setLoggedBy} />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<Dashboard loggedBy={loggedBy} />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="/admin/job-posting" element={<JobPosting />} />
          <Route path="job-details/:id" element={<ViewJobDescription loggedBy = {loggedBy}/>} />
          <Route path="job-posted" element={<JobTable loggedBy={loggedBy} />} />
        </Routes>
      </JobContext.Provider>
    </BrowserRouter>
  );
};

export default App;
