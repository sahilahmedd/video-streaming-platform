import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controllers/subscription.controller.js";

const router = Router();

// Routes
router
  .route("/channel/subscribe/:channelId")
  .patch(verifyJWT, toggleSubscription);
router.get(
  "/channel/subscribers/:channelId",
  verifyJWT,
  getUserChannelSubscribers
);
router.get(
  "/channel/subscriptions/:subscriberId",
  verifyJWT,
  getSubscribedChannels
);

export default router;
