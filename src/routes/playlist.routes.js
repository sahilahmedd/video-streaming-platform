import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getUserPlaylists,
  removeVideoFromPlaylist,
  updatePlaylist,
} from "../controllers/playlist.controller";

const router = Router();

// Routes

// Create Playlist
app.use("/playlist").post(verifyJWT, createPlaylist);

// Get user Playlist
app.use("/playlist/:userId").get(getUserPlaylists);

// Get Playlist by ID
app.use("/playlist/:playlistId").get(getPlaylistById);

// Update
app.use("/playlist/:playlistId").put(verifyJWT, updatePlaylist);

// Delete
app.use("/playlist/:playlistId").delete(verifyJWT, deletePlaylist);

// Add video to playlist
app.use("/playlist/:playlistId/:videoId").put(verifyJWT, addVideoToPlaylist);

// remove video
app.delete(
  "/playlist/:playlistId/:videoId",
  verifyJWT,
  removeVideoFromPlaylist
);

export default router;
