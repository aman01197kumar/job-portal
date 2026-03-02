import express from "express";
import dotenv from "dotenv";
import { user_router } from "./routes/user.route.js";
import router from "./routes/jobPost.route.js";
import cors from "cors";
import { statusRouter } from "./routes/statusCards.route.js";
import path from "path";
import { fileURLToPath } from "url"; // ✅ Needed for __dirname
import { dirname } from "path"; // ✅
import { connectDB } from "./lib.js";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;


// ✅ Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://oppmore.vercel.app"
    ],
    credentials: true,
  })
);


await connectDB()

// ✅ Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/jobs",router);
app.use("/user",user_router);
app.use("/status", statusRouter);
// app.use("/auth", googleRoutes);

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
