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
router.route("/comment").get(getVideoComments);
router.route("/comment").post(verifyJWT, addComment);
router.route("/commnet/:id").patch(verifyJWT, updateComment);
router.route("/comment/:id").delete(verifyJWT, deleteComment);

export default router;
