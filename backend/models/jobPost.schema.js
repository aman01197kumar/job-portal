import mongoose from "mongoose";

const jobPostSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  jobs: [
    {
      organisation_name: String,
      ctc: String,
      job_type: String,
      job_profile: String,
      job_location: String,
      job_description: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ]
});

export const JobPosting = mongoose.model("JobPosting", jobPostSchema);
