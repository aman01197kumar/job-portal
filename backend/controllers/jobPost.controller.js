import { JobPosting } from "../models/jobPost.schema.js";
import mongoose from "mongoose";
import { JOBAPPLICATIONS } from "../models/sentJobApplication.schema.js";

// Create a new Job Post
export const createJobPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const { jobId, organisation_name, job_profile, ctc, job_location, job_type, description } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid or missing userId" });
    }

    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid or missing jobId" });
    }

    // ✅ Try inserting (will fail if duplicate due to unique index)
    const newApplication = new JobApplication({
      userId,
      jobId,
      organisation_name,
      job_profile,
      ctc,
      job_location,
      job_type,
      description,
    });

    await newApplication.save();

    return res.status(200).json({
      success: true,
      message: "Application sent successfully!",
    });
  } catch (error) {
    if (error.code === 11000) {
      // ✅ Duplicate key error from unique index
      return res.status(400).json({
        success: false,
        message: "Application already sent for this job",
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get all Job Posts
export const getAllJobPostsForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const jobPosts = await JobPosting.find().populate(
      "userId",
      "name email"
    );

    console.log(jobPosts);

    const appliedJobs = await JOBAPPLICATIONS.findOne({ userId });

    // Collect applied jobs for quick lookup
    const appliedSet = new Set();
    if (appliedJobs && appliedJobs.sentApplications) {
      appliedJobs.sentApplications.forEach(app => {
        appliedSet.add(
          `${app.organisation_name}|${app.job_profile}|${app.ctc}|${app.job_location}|${app.job_type}`
        );
      });
    }

    // Flatten all jobs and return only unapplied jobs
    const unappliedJobs = [];
    jobPosts.forEach(post => {
      post.jobs.forEach(job => {
        const key = `${job.organisation_name}|${job.job_profile}|${job.ctc}|${job.job_location}|${job.job_type}`;
        if (!appliedSet.has(key)) {
          unappliedJobs.push({
            ...job._doc
          });
        }
      });
    });

    res.status(200).json({ success: true, data: unappliedJobs });
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
}
export const sentJobApplicationController = async (req, res) => {
  const { organisation_name, job_profile, ctc, job_location, job_type, description, _id } = req.body;
  const { userId } = req.params;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(200).json({ message: "Invalid or missing userId", status: 400, success: false });
  }
  try {
    console.log("Request received:", job_location);
    // Check if the user already has a document
    let userApplication = await JOBAPPLICATIONS.findOne({ userId });

    if (userApplication) {
      // Check if job_profile already exists in sentApplications
      const alreadyApplied = userApplication.sentApplications.some(
        (app) => app._id === _id
      );

      if (alreadyApplied) {
        return res.status(200).json({
          message: "Application already sent for this job profile",
          success: false,
          status: 401,
        });
      }

      // Push new application into the array
      userApplication.sentApplications.push({
        organisation_name, job_profile, ctc, job_location, job_type, description
      });

      await userApplication.save();
    } else {
      // Create new document for the user
      const newApplication = new JOBAPPLICATIONS({
        userId,
        sentApplications: [
          {
            organisation_name, job_profile, ctc, job_location, job_type, description
          },
        ],
      });

      await newApplication.save();
    }

    return res.status(200).json({
      message: "Application sent successfully!",
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error("Error while sending application:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      status: 500,
    });
  }
};



export const getSentJobApplication = async (req, res) => {
  const { userId } = req.params;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid or missing userId" });
  }

  const jobs = await JOBAPPLICATIONS.findOne({ userId }).sort({ createdAt: 1 });

  if (!jobs || jobs.length === 0) {
    return res.status(404).json({
      message: "No Applications found",
      status: 404,
      success: false,
    });
  }

  return res.status(200).json({
    success: true,
    status: 200,
    data: jobs,
  });
};

