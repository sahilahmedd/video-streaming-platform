import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  createTweet,
  deleteTweet,
  getUserTweets,
  updateTweet,
} from "../controllers/tweet.controller";

const router = Router();

// routes
router.route("/tweets").get(verifyJWT, getUserTweets);
router.route("/tweets").post(verifyJWT, createTweet);
router.route("/tweets/:id").patch(verifyJWT, updateTweet);
router.route("/tweets/:id").delete(verifyJWT, deleteTweet);

export default router;
