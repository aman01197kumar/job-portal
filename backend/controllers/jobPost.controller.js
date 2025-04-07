import { JobPosting } from "../models/jobPost.schema.js"

export const jobPost = async (req, res) => {
    const { organisation_name, ctc, job_type, job_profile, job_location, job_description } = req.body

    if (!organisation_name || !ctc || !job_type || !job_profile || !job_location || !job_description)
       return res.status(401).json({ message: 'Please fill all the required fields', status: 401 })

    const jobPosting = new JobPosting({
        organisation_name: organisation_name,
        ctc: ctc,
        job_type: job_type,
        job_profile: job_profile,
        job_location: job_location,
        job_description: job_description
    })

    await jobPosting.save()

    return res.status(200).json({ message: 'Job Details saved successfully', status: 200 })
}