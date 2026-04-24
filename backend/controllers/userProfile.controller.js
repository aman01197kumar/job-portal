import mongoose from "mongoose";
import { User } from "../models/user.schema.js";
import { UserProfile } from "../models/userProfile.schema.js";
// Create a new user profile
export const createUserProfile = async (req, res) => {
    const userId = req.params.userId || req.body.userId;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID", status: 400, success: false });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found", status: 404, success: false })
    }

    // Ensure userId is set in the profile
    const profileData = { ...req.body, userId };

    // Validate education array
    if (Array.isArray(profileData.education)) {
        for (let i = 0; i < profileData.education.length; i++) {
            const edu = profileData.education[i];
            if (!edu.institution_type) {
                return res.status(422).json({ error: `Education entry ${i + 1}: institution_type is required.` });
            }
        }
    }

    try {
        const userProfile = new UserProfile(profileData);
        await userProfile.save();
        res.status(201).json(userProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a user profile by ID
export const getUserProfileById = async (req, res) => {
    try {
        const userProfile = await UserProfile.findById(req.params.id);
        if (!userProfile) {
            return res.status(404).json({ error: "User profile not found" });
        }
        res.json(userProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user profile
export const updateUserProfile = async (req, res) => {
    const validationErrors = validateUserProfileInput(req.body);
    if (validationErrors) {
        return res.status(422).json({ errors: validationErrors });
    }
    try {
        const userProfile = await UserProfile.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!userProfile) {
            return res.status(404).json({ error: "User profile not found" });
        }
        res.json(userProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user profile
export const deleteUserProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findByIdAndDelete(req.params.id);
        if (!userProfile) {
            return res.status(404).json({ error: "User profile not found" });
        }
        res.json({ message: "User profile deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// List all user profiles (with optional filters)
export const listUserProfiles = async (req, res) => {
    try {
        const filters = req.query || {};
        const userProfiles = await UserProfile.find(filters);
        res.json(userProfiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

