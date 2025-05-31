import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addComment,
  deleteComment,
  getVideoComments,
  updateComment,
} from "../controllers/comment.controller.js";

const router = Router();

// Routes
router.route("/comment/:videoId").get(getVideoComments);
router.route("/comment/:videoId").post(verifyJWT, addComment);
router.route("/comment/:commentId").patch(verifyJWT, updateComment);
router.route("/comment/:commentId").delete(verifyJWT, deleteComment);

export default router;
