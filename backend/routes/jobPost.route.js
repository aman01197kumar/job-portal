import express from 'express'
import { jobPost } from '../controllers/jobPost.controller.js'

export const jobPostRoute = express.Router()

jobPostRoute.post('/job-post', jobPost)