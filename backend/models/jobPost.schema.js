import mongoose from "mongoose";

const jobApplicationSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    index: true, // ✅ faster queries
  },
  jobId: {
    type: mongoose.Schema.ObjectId,
    ref: "Job",
    required: true,
    index: true, // ✅ avoids duplicates
  },
  organisation_name: String,
  job_profile: String,
  ctc: String,
  job_location: String,
  job_type: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true, // ✅ sort fast
  },
});

// ✅ Prevent duplicate applications (same user, same job)
jobApplicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });

export const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
