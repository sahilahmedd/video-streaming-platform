import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

  const { channelId } = req.params;

  if (!mongoose.isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel ID");
  }

  // Total videos
  const totalVideos = await Video.countDocuments({ owner: channelId });

  // Total subscribers
  const totalSubscribers = await Subscription.countDocuments({
    channel: channelId,
  });

  // Total likes on all videos by this channel
  const totalLikes = await Like.countDocuments({
    likeableType: "Video",
    owner: channelId,
  });

  // Total views on all videos by this channel
  const videos = await Video.find({ owner: channelId }, "views");
  const totalViews = videos.reduce((sum, video) => sum + (video.views || 0), 0);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalVideos,
        totalSubscribers,
        totalLikes,
        totalViews,
      },
      "Channel stats fetched successfully"
    )
  );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel

  const { channelId } = req.params;

  if (!mongoose.isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel ID");
  }

  const videos = await Video.find({ owner: channelId })
    .sort({ createdAt: -1 })
    .populate("owner", "fullname username avatar");

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Channel videos fetched successfully"));
});

export { getChannelStats, getChannelVideos };
