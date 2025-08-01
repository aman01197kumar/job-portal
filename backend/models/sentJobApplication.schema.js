import mongoose from "mongoose";

const sentJobApplicationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    sentApplications: [
        {

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
            description: {
                type: String,
                required: true
            },
            appliedOn: {
                type: Date,
                default: Date.now()
            }
        }
    ]

})

export const JOBAPPLICATIONS = mongoose.model("JOBAPPLICATIONS", sentJobApplicationSchema)