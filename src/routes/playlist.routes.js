import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getUserPlaylists,
  removeVideoFromPlaylist,
  updatePlaylist,
} from "../controllers/playlist.controller.js";

const router = Router();

// ✅ Create Playlist
router.post("/playlist", verifyJWT, createPlaylist);

// ✅ Get all playlists for a user
router.get("/playlist/user/:userId", getUserPlaylists);

// ✅ Get playlist by ID
router.get("/playlist/:playlistId", getPlaylistById);

// ✅ Update Playlist
router.put("/playlist/:playlistId", verifyJWT, updatePlaylist);

// ✅ Delete Playlist
router.delete("/playlist/:playlistId", verifyJWT, deletePlaylist);

// ✅ Add video to playlist
router.put("/playlist/:playlistId/video/:videoId", verifyJWT, addVideoToPlaylist);

// ✅ Remove video from playlist
router.delete("/playlist/:playlistId/video/:videoId", verifyJWT, removeVideoFromPlaylist);

export default router;
