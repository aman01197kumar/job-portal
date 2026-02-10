import mongoose from "mongoose";

const userProfile = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  techStack: {
    type: Object,
  },
  resume: {
    type: String,
  },

  profile_img: {
    type: String,
  },
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  github: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  company: {
    type: String,
  },
  yearsOfExperience: {
    type: Number,
  },
  availabilityStatus: {
    type: String,
  },
  job_role: {
    type: String
  },
  experience_level:{
    type:Number
  }
});

export const UserProfile = mongoose.model("UserProfile", userProfile);
