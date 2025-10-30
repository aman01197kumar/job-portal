import { User } from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserProfile } from "../models/userProfile.schema.js";
import mongoose from "mongoose";
const userSignup = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone_number, user } = req.body;
    const full_name = `${first_name} ${last_name}`

    if (!email || !full_name || !phone_number || !password || !user) {
      return res.status(401).json({ status: 401, message: "Fill all the fields" });
    }

    // ✅ Check using actual DB field names
    const userData = await User.findOne({
      $or: [{ email }, { phone_number }]
    });

    if (userData) {
      return res.status(409).json({ status: 409, message: "Email or Contact Number already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const users = new User({
      full_name,
      email,
      phone_number,
      password: hashedPassword,
      user,
    });

    await users.save();

    return res.status(200).json({
      status: 200,
      message: "Data saved successfully",
      users,
    });
  } catch (err) {
    console.error("Signup error:", err);

    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
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
      { userid: user._id, username: user.full_name, email: user.email },
      process.env.SECRET_KEY
    );

    return res.status(200).json({
      message: "login successful",
      status: 200,
      user: user.user,
      userId: user._id,
      username: user.full_name,
      token: token,
    });
  }
  catch (err) {
    return res.status(500).json({ message: "Internal Server Error", status: 500, success: false })
  }
};

export const getUserProfile = async (req, res) => {
  try {

    const token = req.headers['authorization'].split(' ')[1]

    const decode = await jwt.verify(token, process.env.SECRET_KEY)

    const { userid } = decode

    if (!userid)
      return res.status(404).json({ success: false, message: 'Session expired. Please login again' })

    const user = await UserProfile.findOne({ userId: userid })

    return res.status(200).json({ success: true, data: user })

  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, success: false, status: 500 });
  }
};


export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing userId. Please login again.",
      });
    }

    const {
      techStack,
      bio,
      location,
      website,
      github,
      linkedIn,
      jobTitle,
      company,
      yearsOfExperience,
      availabilityStatus
    } = req.body;

    const profile_img = req.files?.image?.[0]?.path;
    const resume = req.files?.resume?.[0]?.path;

    const user = await UserProfile.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          techStack,
          bio,
          location,
          website,
          github,
          linkedIn,
          jobTitle,
          company,
          yearsOfExperience,
          availabilityStatus,
          resume,
          profile_img
        }
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "User Data updated successfully!",
      user,
    });
  } catch (err) {
    console.error("❌ Error updating user profile:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


export { userSignup, userLogin };
