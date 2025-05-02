import { Router } from "express";
import { SessionsController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

export const SessionsRoutes = Router();

SessionsRoutes.post("/login", SessionsController.login);
SessionsRoutes.delete("/logout", authMiddleware, SessionsController.logout);