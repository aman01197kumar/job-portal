import { APPLIEDJOBS } from "../models/appliedJobs.schema.js";
import mongoose from "mongoose";
import { User } from "../models/user.schema.js";

export const statusCards = async (req, res) => {
  try {
    const user = await User.findById(req.user.userid)
    

    if (!user._id || !mongoose.Types.ObjectId.isValid(user._id)) {
      return res.status(400).json({
        success: false,
        message: "Please login again.",
      });
    }

    // Use countDocuments for a precise count with a filter
    const totalAppliedJobs = await APPLIEDJOBS.countDocuments({ userId: user._id });

    return res.status(200).json({
      success: true,
      totalAppliedJobs,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
