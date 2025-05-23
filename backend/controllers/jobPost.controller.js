import { JobPosting } from "../models/jobPost.schema.js";
import mongoose from "mongoose";

// Create a new Job Post
export const createJobPost = async (req, res) => {
  try {
    const { userId, jobs } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid or missing userId" });
    }

    // Convert to ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);

    let jobPost = await JobPosting.findOne({ userId: objectId });

    if (jobPost) {
      jobPost.jobs.push(...jobs);
      await jobPost.save();
    } else {
      jobPost = new JobPosting({ userId: objectId, jobs });
      await jobPost.save();
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Job posted successfully",
    });
  } catch (error) {
    console.error("Error posting job:", error);
    res
      .status(500)
      .json({ success: false, message: error.message, status: 500 });
  }
};

// Get all Job Posts
export const getAllJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPosting.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email");
    res.status(200).json({ success: true, data: jobPosts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Job Posts by User ID
export const getJobPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const jobPosts = await JobPosting.find({ userId }).populate(
      "userId",
      "name email"
    );
    res.status(200).json({ success: true, data: jobPosts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a Job Post (optional)
export const deleteJobPost = async (req, res) => {
  try {
    const { jobPostId } = req.params;
    const { jobIndex } = req.body;

    const jobPost = await JobPosting.findById(jobPostId);

    if (!jobPost) {
      return res
        .status(404)
        .json({ success: false, message: "Job post not found" });
    }

    if (jobIndex < 0 || jobIndex >= jobPost.jobs.length) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid job index" });
    }

    // Remove the job at the specific index
    jobPost.jobs.splice(jobIndex, 1);
    await jobPost.save();

    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
