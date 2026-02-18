import express from "express";
import {
  getAllUser,
  getUserProfile,
  googleAuth,
  updateUserProfile,
  userLogin,
  userSignup,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/fileUpload.multer.js";

export const user_router = express.Router();

user_router.post("/signup", userSignup);
user_router.post("/login", userLogin);
user_router.get('/get-user-details', getUserProfile)
user_router.put('/update-user-profile/:userId', upload.fields([
  { name: "image", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]), updateUserProfile)

user_router.get('/google-auth',googleAuth)
user_router.get('/get-all-users',getAllUser)