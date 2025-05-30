import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getLikedVideos,
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
} from "../controllers/like.controller.js";

const router = Router();

// Get liked videos by a user
router.get("/likes/videos/:userID", verifyJWT, getLikedVideos);

// Toggle like on a video
router.patch("/likes/video/:videoId", verifyJWT, toggleVideoLike);

// Toggle like on a comment
router.patch("/likes/comment/:commentId", verifyJWT, toggleCommentLike);

// Toggle like on a tweet
router.patch("/likes/tweet/:tweetId", verifyJWT, toggleTweetLike);

export default router;
