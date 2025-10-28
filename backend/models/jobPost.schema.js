import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  organisation_name: {
    type: String,
    required: true
  },
  job_profile: {
    type: String,
    required: true
  },
  ctc: {
    type: String,
    required: true
  },
  job_description: {
    type: String,
    required: true
  },
  job_location: {
    type: String,

  },
  job_type: {
    type: String,

  },

}, { timestamps: true });

export const JobPost = mongoose.model("JobPost", jobPostSchema);
