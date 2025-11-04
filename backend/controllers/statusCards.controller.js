import { APPLIEDJOBS } from "../models/appliedJobs.schema.js";
import mongoose from "mongoose";

export const statusCards = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing userId. Please login again.",
      });
    }

    // Use countDocuments for a precise count with a filter
    const totalAppliedJobs = await APPLIEDJOBS.countDocuments({ userId });

    return res.status(200).json({
      success: true,
      totalAppliedJobs,
    });
  } catch (err) {
    console.error("Error fetching status cards data:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
