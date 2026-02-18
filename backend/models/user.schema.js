import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  feature_selection: { type: String, required: true },
  location: { type: String }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
