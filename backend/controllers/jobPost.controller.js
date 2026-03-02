import { JobPost } from "../models/jobPost.schema.js";
import mongoose from "mongoose";
import { APPLIEDJOBS } from "../models/appliedJobs.schema.js";

export const createJobPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const { organisation_name, job_profile, ctc, job_location, job_type, job_description } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Please login again" });
    }
    if (!organisation_name || !job_profile || !ctc || !job_location || !job_type || !job_description)
      return res.status(400).json({ success: false, message: 'Please fill all the fields' })

    if (organisation_name.length < 4)
      return res.status(400).json({ success: false, message: 'Please add Organisation Name' })

    if (Number(ctc) < 100000)
      return res.status(400).json({ success: false, message: 'CTC cannot be less than 100000' })

    const newJob = new JobPost({
      userId,
      organisation_name,
      job_profile,
      ctc,
      job_location,
      job_type,
      job_description
    })

    await newJob.save()


    return res.status(200).json({ success: true, message: 'new job generated', newJob })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get all Job Posts
export const getAllJobPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid or missing userId" });
    }

    // Get all jobIds user has applied to
    const appliedJobIds = await APPLIEDJOBS.find({ userId }).distinct("jobId");

    let filteredJobs;

    if (appliedJobIds.length === 0) {
      // If user hasn't applied anywhere, show all jobs
      filteredJobs = await JobPost.find();
    } else {
      // Show jobs that are *not* in appliedJobIds → DIFFERENCE
      filteredJobs = await JobPost.find({ _id: { $nin: appliedJobIds } });
    }

    return res.status(200).json({
      success: true,
      totalJobs: filteredJobs.length,
      message:
        appliedJobIds.length === 0
          ? "No jobs applied yet — showing all jobs"
          : "Showing jobs not yet applied",
      data: filteredJobs,
    });
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//GET ALL JOBS IN EMPLOYER PANEL
export const getJobsEmployerPanel = async (req, res) => {
  try {
    const { userId } = req.params
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid or missing userId. Please login again" });
    }
    const fetchJobs = await JobPost.find({ userId })

    if (!fetchJobs)
      return res.status(404).json({ message: 'No jobs posted yet!!', success: false })

    return res.status(200).json({ message: 'jobs fetched successfully!', data: fetchJobs })
  }
  catch (err) {
    return res.status(500).json({ message: err.message, success: false })
  }
}

// Get Job Applications by a candidate
export const getAppliedJobsByCandidate = async (req, res) => {
  try {
    const { userId } = req.params;

    const jobPosts = await APPLIEDJOBS.find({ userId }).populate("userId", "full_name email");

    if (!jobPosts) {
      return res.status(404).json({
        success: false,
        message: "No applications found for this user.",
      });
    }
    res.status(200).json({ success: true, data: jobPosts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a Job Post (optional)
// export const deleteJobPost = async (req, res) => {
//   try {
//     const { jobPostId } = req.params;
//     const { jobIndex } = req.body;

//     const jobPost = await JobApplication.findById(jobPostId);

//     if (!jobPost) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Job post not found" });
//     }

//     if (jobIndex < 0 || jobIndex >= jobPost.jobs.length) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid job index" });
//     }

//     // Remove the job at the specific index
//     jobPost.jobs.splice(jobIndex, 1);
//     await jobPost.save();

//     res
//       .status(200)
//       .json({ success: true, message: "Job deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// }
export const sentJobApplicationController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { jobId, organisation_name, job_profile, ctc, job_location, job_type, description } = req.body;

    // 🧩 Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing userId. Please login again.",
      });
    }

    // 🧩 Validate jobId
    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing jobId.",
      });
    }

    // 🧩 Check if the job exists in JobPost collection
    const jobExists = await JobPost.findById(jobId);
    if (!jobExists) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    // 🧩 Check if user already applied for this job
    const alreadyApplied = await APPLIEDJOBS.findOne({ userId, jobId });
    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    // 🧩 Create a new applied job record
    const newApplication = new APPLIEDJOBS({
      userId,
      jobId,
      organisation_name: organisation_name || jobExists.organisation_name,
      job_profile: job_profile || jobExists.job_profile,
      ctc: ctc || jobExists.ctc,
      job_location: job_location || jobExists.job_location,
      job_type: job_type || jobExists.job_type,
      description: description || jobExists.job_description,
    });

    await newApplication.save();

    return res.status(201).json({
      success: true,
      message: "Application sent successfully!",
      data: newApplication,
    });

  } catch (error) {
    console.error("❌ Error while sending application:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};




export const getSentJobApplication = async (req, res) => {
  const { userId } = req.params;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid or missing userId" });
  }

  try {
    const userApplications = await APPLIEDJOBS.findOne({ userId });


    if (!userApplications || userApplications.sentApplications.length === 0) {
      return res.status(200).json({
        success: true,
        status: 200,
        message: "No applications found for this user.",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: userApplications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, status: 500 });
  }
};
