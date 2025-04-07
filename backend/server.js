import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { loginRoute, signupRoute } from "./routes/user.route.js";
import { jobPostRoute } from "./routes/jobPost.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const MONGO_URL = process.env.MONGO_URL;
try {
  mongoose.connect(MONGO_URL);
  console.log("database connected");
} catch (err) {
  console.log("not able to connect", err);
}

app.use(express.json());
app.use(signupRoute);
app.use(loginRoute);
app.use(jobPostRoute);
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
