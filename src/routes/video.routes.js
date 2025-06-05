import { Router } from "express";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishAVideo,
  togglePublishStatus,
  updateVideo,
} from "../controllers/video.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

// Routes
router.get("/videos", getAllVideos);
router.patch("/videos/publish/", verifyJWT, publishAVideo);
router.get("/video/:videoId", getVideoById);
router.patch("/video/:videoId", verifyJWT, updateVideo);
router.patch("/video/:videoId", verifyJWT, deleteVideo);
router.patch("/video/publish/:videoId", verifyJWT, togglePublishStatus);

export default router;
