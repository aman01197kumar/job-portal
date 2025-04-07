import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: String,
  first_name: String,
  last_name: String,
  phone_number: String,
  password: String,
  user: String,
});

export const User = mongoose.model("User", userSchema);
