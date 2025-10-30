import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { user_router } from "./routes/user.route.js";
import router from "./routes/jobPost.route.js";
import cors from "cors";
import { googleRoutes } from "./routes/google.route.js";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;


const MONGO_URL = process.env.MONGO_URL;

app.use(cors({ origin: true }));

try {
  mongoose.connect(MONGO_URL)
  console.log('database connected!!!');
}
catch (err) {
  console.log(console.log(err))
}
app.use(router);

app.use("/uploads", express.static("uploads")); // Serve images statically

app.use(user_router);
app.use('/auth', googleRoutes)
app.listen(PORT, () => console.log(`Server is running at ${PORT}`))
