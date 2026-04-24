import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
    match: [
      /^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
      "Please enter a valid email address"
    ]
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
    minlength: [2, "Full name must be at least 2 characters"],
    maxlength: [50, "Full name must be less than 50 characters"]
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    index: true,
    match: [
      /^\+?[0-9]{10,15}$/,
      "Please enter a valid phone number"
    ]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  feature_selection: {
    type: String,
    required: [true, "Feature selection is required"],
    enum: {
      values: ["Job Seeker", "Recruiter", "Admin", "Collaborator"],
      message: "Feature selection must be either 'Job Seeker', 'Recruiter', 'Admin', or 'Collaborator'"
    }
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, "Location must be less than 100 characters"]
  }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
