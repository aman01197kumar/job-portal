import express from "express";
import {
  createJobPost,
  deleteJobPost,
  getAllJobPostsForUser,
  getJobPostsByUser,
  getSentJobApplication,
  sentJobApplicationController,
} from "../controllers/jobPost.controller.js";

const router = express.Router();

// POST create job post
router.post("/jobs", createJobPost);

// GET all job posts
router.get("/jobs/:userId", getApplicationsByUser);

// GET jobs by userId
router.get("/jobs/user/:userId", getJobPostsByUser);

// DELETE job post
router.delete("/jobs/:jobPostId", deleteJobPost);

//POST sent job application
router.post('/job-applications/:userId', sentJobApplicationController)

//GET all sent jobs application
router.get('/get-job-applications/:userId', getSentJobApplication)

export default router;
