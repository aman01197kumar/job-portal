import { OAuth2Client } from "google-auth-library";
import { User } from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserProfile } from "../models/userProfile.schema.js";
import mongoose from "mongoose";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const userSignup = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone_number, user } =
      req.body;
    const full_name = `${first_name} ${last_name}`;

    if (!email || !full_name || !phone_number || !password || !user) {
      return res
        .status(401)
        .json({ status: 401, message: "Fill all the fields" });
    }

    // ✅ Check using actual DB field names
    const userData = await User.findOne({
      $or: [{ email }, { phone_number }],
    });

    if (userData) {
      return res.status(409).json({
        status: 409,
        message: "Email or Contact Number already exists.",
      });
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


export const googleAuth = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    // 🟡 OAuth success, but onboarding not complete
    if (!user) {
      return res.status(200).json({
        success: true,
        needsOnboarding: true,
        user: {
          email,
          name,
          picture,
        },
      });
    }

    // 🟢 User exists and fully onboarded
    return res.status(200).json({
      success: true,
      needsOnboarding: false,
      user,
    });

  } catch (err) {
    console.error("Google auth error:", err);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired Google token",
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
      return res
        .status(200)
        .json({ message: "Incorrect password", status: 401 });

    const token = await jwt.sign(
      { userid: user._id, username: user.full_name, email: user.email },
      process.env.SECRET_KEY
    );
    const fetchUserImage = await UserProfile.findOne({ userId: user._id });

    return res.status(200).json({
      message: "login successful",
      status: 200,
      user: user.user,
      userId: user._id,
      username: user.full_name,
      token: token,
      profileImage: fetchUserImage?.profile_img,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, status: 500, success: false });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    const decode = await jwt.verify(token, process.env.SECRET_KEY);

    const { userid } = decode;

    if (!userid)
      return res.status(404).json({
        success: false,
        message: "Session expired. Please login again",
      });

    const user = await UserProfile.findOne({ userId: userid });

    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, success: false, status: 500 });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // ✅ Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing userId. Please login again.",
      });
    }

    // ✅ Fetch main user (for name & email)
    const findUser = await User.findById(userId);

    if (!findUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
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
      availabilityStatus,
    } = req.body;

    // ✅ Optional files
    const profile_img = req.files?.image?.[0]?.path;
    const resume = req.files?.resume?.[0]?.path;

    // ✅ Upsert user profile
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId }, // ✅ keep linked by userId
      {
        $set: {
          userId, // maintain relationship
          username: findUser.full_name, // ✅ from User model
          email: findUser.email, // ✅ from User model
          techStack: techStack ? techStack : null,
          bio: bio ? bio : null,
          location: location ? location : null,
          website: website ? website : null,
          github: github ? github : null,
          linkedIn: linkedIn ? linkedIn : null,
          jobTitle: jobTitle ? jobTitle : null,
          company: company ? company : null,
          yearsOfExperience: yearsOfExperience ? yearsOfExperience : null,
          availabilityStatus: availabilityStatus ? availabilityStatus : null,
          ...(resume && { resume }),
          ...(profile_img && { profile_img }),
        },
      },
      { new: true, upsert: true, returnDocument: "after" } // create if doesn't exist
    );

    console.log(updatedProfile, "updatedProfile");
    await updatedProfile.save();
    return res.status(200).json({
      success: true,
      message: "User Data updated successfully!",
      data: updatedProfile,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export { userSignup, userLogin };
