import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { user_router } from "./routes/user.route.js";
import router from "./routes/jobPost.route.js";
import cors from "cors";
import { googleRoutes } from "./routes/google.route.js";
import { statusRouter } from "./routes/statusCards.route.js";
import path from "path";
import { fileURLToPath } from "url"; // ✅ Needed for __dirname
import { dirname } from "path"; // ✅

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

// ✅ Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// ✅ Database connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ Database connected!"))
  .catch((err) => console.error("❌ Database connection failed:", err));

// ✅ Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(router);
app.use(user_router);
app.use("/status", statusRouter);
app.use("/auth", googleRoutes);

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
