import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck.controller.js";

const router = Router()

// routes
router.get("/health", healthcheck)



export default router