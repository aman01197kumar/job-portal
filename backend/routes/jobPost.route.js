import express from "express";
import {
  createJobPost,
  getAllJobPosts,
  getAppliedJobsByCandidate,
  getJobsEmployerPanel,
  getSentJobApplication,
  sentJobApplicationController,
} from "../controllers/jobPost.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(auth)
// POST create job post
router.post("/create-jobs/:userId", createJobPost);
//GET job posted by employer in employer paner
router.get('/admin/job/posted/:userId', getJobsEmployerPanel)


// DELETE job post
// router.delete("/jobs/:jobPostId", deleteJobPost);

//Job Seeker
//POST sent job application
router.post('/job-applications', sentJobApplicationController)

// GET all job posts
router.get("/recent-jobs", getAllJobPosts);

// GET jobs by userId
router.get("/jobs/user/:userId", getAppliedJobsByCandidate);

//GET all sent jobs application
router.get('/get-job-applications/:userId', getSentJobApplication)


export default router;
