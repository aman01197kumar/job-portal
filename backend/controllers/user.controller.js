import { User } from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSignup = async (req, res) => {
  try {
    const { full_name, email, password, contactNumber, user } = req.body;

    if (!email || !full_name || !contactNumber || !password || !user)
      return res
        .status(200)
        .json({ status: 401, message: "fill all the fields" });

    const userData = await User.findOne({ email: email });

    if (userData)
      return res
        .status(200)
        .json({ status: 409, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const users = new User({
      email: email,
      full_name: full_name,
      phone_number: contactNumber,
      password: hashedPassword,
      user: user,
    });

    await users.save();
    return res
      .status(200)
      .json({ status: 200, message: "Data saved successfully", users });
  } catch (err) {
    console.error("Signup error:", err);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {

    if (!email || !password)
      return res
        .status(200)
        .json({ message: "Fill all the details", status: 400 });
    const user = await User.findOne({ email });

    if (!user)
      return res.status(200).json({ message: "User not found", status: 404 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(200).json({ message: "Incorrect password", status: 401 });

    const token = await jwt.sign(
      { userid: user._id, username: user.full_name },
      process.env.SECRET_KEY
    );

    return res.status(200).json({
      message: "login successful",
      status: 200,
      user: user.user,
      userId: user._id,
      email: user.email,
      token: token,
    });
  }
  catch (err) {
    return res.status(500).json({ message: "Internal Server Error", status: 500, success: false })
  }
};

export const updateUserData = async (req, res) => {
  try {
    const { email } = req.query;
    const { full_name, description, skills } = req.body;

    const user_img = req.files?.image?.[0];
    const resume = req.file;

    const user = await User.findOne({ email });

    user.full_name = full_name;
    user.description = description;
    user.skills = skills;
    user.resume = resume ? resume.path : user.resume;
    user.profile_img = user_img ? user_img.path : user.profile_img;


    await user.save();
    return res.status(200).json({
      success: true,
      message: "data updated successfully!!",
      status: 200,
      user,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, success: false, status: 500 });
  }
};

export const getUserData = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(200)
        .json({ success: false, status: 404, message: "User not found" });

    return res
      .status(200)
      .json({ success: true, status: 200, message: "User found", user });
  } catch (err) {
    console.log(err);
  }
};

export { userSignup, userLogin };
