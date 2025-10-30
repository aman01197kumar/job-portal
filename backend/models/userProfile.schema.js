import mongoose from "mongoose";

const userProfile = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true, index: true
    },
    techStack: {
        type: Object,
    },
    resume: {
        type: String,
    },

    profile_img: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    location: {
        type: String,
    },
    website: {
        type: String,
    },
    github: {
        type: String,
    },
    linkedIn: {
        type: String,
    },
    jobTitle: {
        type: String,
    },
    company: {
        type: String,
    },
    yearsOfExperience: {
        type: Number,
    },
    availabilityStatus: {
        type: Boolean,
    },
})

export const UserProfile = mongoose.model('UserProfile', userProfile)
