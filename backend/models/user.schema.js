import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  phone_number: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  user: { type: String, required: true },
  description: String,
  user_img: String,
  skills: Object,
  resume: String,
  profile_img: String,
});

export const User = mongoose.model("User", userSchema);
