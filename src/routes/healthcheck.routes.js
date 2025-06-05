import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck.controller";

const router = Router()

// routes
router.get("/health", healthcheck)



export default router