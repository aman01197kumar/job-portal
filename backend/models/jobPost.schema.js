import mongoose from "mongoose";

const jobPostSchema = mongoose.Schema({
    organisation_name: String,
    ctc: String,
    job_type: String,
    job_profile: String,
    job_location: String,
    job_description: String
})

export const JobPosting = mongoose.model('JobPosting', jobPostSchema)