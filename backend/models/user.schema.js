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
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
