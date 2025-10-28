import mongoose from "mongoose";

const appliedJobsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPost",
        required: true
    },
    organisation_name: {
        type: String,
        required: true
    },
    job_profile: {
        type: String,
        required: true
    },
    ctc: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    job_location: {
        type: String,

    },
    job_type: {
        type: String,

    },
    appliedOn: {
        type: Date,
        default: Date.now
    }

})

export const APPLIEDJOBS = mongoose.model("APPLIEDJOBS", appliedJobsSchema)