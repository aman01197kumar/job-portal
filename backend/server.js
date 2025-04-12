import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { loginRoute, signupRoute } from "./routes/user.route.js";
import { jobPostRoute } from "./routes/jobPost.route.js";
import cors from 'cors'


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const MONGO_URL = process.env.MONGO_URL;
app.use(cors({origin:true}))
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));

app.use(express.json());
app.use(signupRoute);
app.use(loginRoute);
app.use(jobPostRoute);
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
