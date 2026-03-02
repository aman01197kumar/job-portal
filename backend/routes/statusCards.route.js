import express from "express";
import { statusCards } from "../controllers/statusCards.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

export const statusRouter = express.Router();

statusRouter.use(auth)

statusRouter.get("/status-cards", statusCards);
