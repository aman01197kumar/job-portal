import { JobPost } from "../models/jobPost.schema.js";
import mongoose from "mongoose";
import { APPLIEDJOBS } from "../models/appliedJobs.schema.js";
import { jobs } from "googleapis/build/src/apis/jobs/index.js";

export const createJobPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const { jobId, organisation_name, job_profile, ctc, job_location, job_type, job_description } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Please login again" });
    }
    if (!organisation_name || !job_profile || !ctc || !job_location || !job_type || !job_description)
      return res.status(400).json({ success: false, message: 'Please fill all the fields' })

    if (organisation_name.length < 4)
      return res.status(400).json({ success: false, message: 'Please add Organisation Name' })

    if (Number(ctc) < 100000)
      return res.status(400).json({ success: false, message: 'CTC cannot be less than 100000' })


    const jobsDatabase = await JobPost.findOne({ userId })

    const newJob = {
      organisation_name,
      job_profile,
      ctc,
      job_location,
      job_type,
      job_description
    }

    if (jobsDatabase) {
      jobsDatabase.postedJobs.push(newJob)
      await jobsDatabase.save()
    }
    else {
      const newDatabase = new JobPost({
        userId, postedJobs: [newJob]
      })
      await newDatabase.save()
    }


    return res.status(200).json({ success: true, message: 'new job generated' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get all Job Posts
export const getAllJobPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid or missing userId" });
    }


    const allJobsApplications = await JobPost.find()
    const arr = []
    allJobsApplications.forEach(jobs => jobs.postedJobs.forEach(job => arr.push(job)))
    res.status(200).json({ jobs: arr, success: true })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Job Applications by a candidate
export const getAppliedJobsByCandidate = async (req, res) => {
  try {
    const { userId } = req.params;

    const jobPosts = await APPLIEDJOBS.findOne({ userId }).populate("userId", "full_name email");

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
  const { organisation_name, job_profile, ctc, job_location, job_type, description } = req.body;
  const { userId } = req.params;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: "Invalid or missing userId",
      status: 400,
      success: false,
    });
  }

  try {
    // Find user's applications
    let userApplication = await APPLIEDJOBS.findOne({ userId });

    if (userApplication) {
      // ✅ Check if a job with same details already exists
      const alreadyApplied = userApplication.sentApplications.some(
        (app) =>
          app.organisation_name === organisation_name &&
          app.job_profile === job_profile &&
          app.ctc === ctc &&
          app.job_location === job_location &&
          app.job_type === job_type
      );

      if (alreadyApplied) {
        return res.status(200).json({
          message: "Application already sent for this job profile",
          success: false,
          status: 401,
        });
      }

      // Push new application
      userApplication.sentApplications.push({
        organisation_name,
        job_profile,
        ctc,
        job_location,
        job_type,
        description,
      });

      await userApplication.save();
    } else {
      // Create a new document if not found
      const newApplication = new APPLIEDJOBS({
        userId,
        sentApplications: [
          {
            organisation_name,
            job_profile,
            ctc,
            job_location,
            job_type,
            description,
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
