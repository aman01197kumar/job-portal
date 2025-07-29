import express from 'express'
import { googleController } from '../controllers/googleController.js'

export const googleRoutes = express.Router()

googleRoutes.get('/google',googleController)