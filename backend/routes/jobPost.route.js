import express from "express";
import {
  createJobPost,
  deleteJobPost,
  getAllJobPosts,
  getJobPostsByUser,
} from "../controllers/jobPost.controller.js";

const router = express.Router();

// POST create job post
router.post("/jobs", createJobPost);

// GET all job posts
router.get("/jobs", getAllJobPosts);

// GET jobs by userId
router.get("/jobs/user/:userId", getJobPostsByUser);

// DELETE job post
router.delete("/jobs/:jobPostId", deleteJobPost);

export default router;
