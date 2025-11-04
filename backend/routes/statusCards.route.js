import express from "express";
import { statusCards } from "../controllers/statusCards.controller.js";

export const statusRouter = express.Router();

statusRouter.get("/status-cards/:userId", statusCards);
