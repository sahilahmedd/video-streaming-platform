import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createTweet,
  deleteTweet,
  getUserTweets,
  updateTweet,
} from "../controllers/tweet.controller.js";

const router = Router();

// routes
router.use(verifyJWT)
router.route("/tweets").get(getUserTweets);
router.route("/tweets").post(createTweet);
router.route("/tweets/:tweetId").put(updateTweet);
router.route("/tweets/:tweetId").delete(deleteTweet);

export default router;
