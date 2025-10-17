import express from "express";
import {
  createJobPost,
  // deleteJobPost,
  getAllJobPosts,
  getAppliedJobsByCandidate,
  getSentJobApplication,
  sentJobApplicationController,
} from "../controllers/jobPost.controller.js";

const router = express.Router();

// POST create job post
router.post("/create-jobs/:userId", createJobPost);

// GET all job posts
router.get("/jobs/:userId", getAllJobPosts);


// DELETE job post
// router.delete("/jobs/:jobPostId", deleteJobPost);

//Job Seeker
//POST sent job application
router.post('/job-applications/:userId', sentJobApplicationController)

// GET jobs by userId
router.get("/jobs/user/:userId", getAppliedJobsByCandidate);

//GET all sent jobs application
router.get('/get-job-applications/:userId', getSentJobApplication)

export default router;
