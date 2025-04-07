import express from 'express'
import { userLogin, userSignup } from '../controllers/user.controller.js'


const signupRoute = express.Router()
const loginRoute = express.Router()

signupRoute.post('/signup', userSignup)
loginRoute.post('/login', userLogin)

export { signupRoute, loginRoute }