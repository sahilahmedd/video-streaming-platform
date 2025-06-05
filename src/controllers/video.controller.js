import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query = "",
    sortBy = "createdAt",
    sortType = "desc",
    userId,
  } = req.query;

  // Validate userId if provided
  if (userId && !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  // Step 1: Build filter
  const filter = {
    isPublishedublished: true, // Only public videos
  };

  if (userId) {
    filter.owner = userId;
  }

  if (query.trim() !== "") {
    filter.$or = [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ];
  }

  // Step 2: Build sort object
  const sortOptions = {};
  if (sortBy && typeof sortBy === "string") {
    sortOptions[sortBy] = sortType === "asc" ? 1 : -1;
  }

  // Step 3: Pagination values
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Step 4: Fetch videos
  const videos = await Video.find(filter)
    .sort(sortOptions)
    .skip(skip)
    .limit(parseInt(limit))
    .populate("owner", "username fullname avatar");

  // Step 5: Get total count
  const total = await Video.countDocuments(filter);

  // Step 6: Send response
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        videos,
      },
      "Videos fetched successfully"
    )
  );
});

const publishAVideo = asyncHandler(async (req, res) => {
  // TODO: get video, upload to cloudinary, create video
  const { title, description } = req.body;
  const localVideoPath = req.file?.path;

  if (!title?.trim() || !description?.trim()) {
    throw new ApiError(400, "Title and description cannot be empty");
  }

  if (!localVideoPath) {
    throw new ApiError(400, "No video file provided");
  }

  const uploadedVideo = await uploadOnCloudinary(localVideoPath);

  if (!uploadedVideo?.url) {
    throw new ApiError(500, "Video upload failed");
  }

  const video = await Video.create({
    owner: req.user._id,
    title,
    description,
    videoFile: uploadedVideo.url,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video published successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  //TODO: get video by id
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  const video = await Video.findById(videoId)
    .populate("owner", "username fullname avatar")
    .lean();

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;
  const localThumbnailPath = req.file?.path;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  if (!title?.trim() || !description?.trim()) {
    throw new ApiError(400, "Title and description cannot be empty");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  // Check ownership
  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to update this video");
  }

  // Upload new thumbnail only if file is present
  let newThumbnail = video.thumbnail;
  if (localThumbnailPath) {
    const uploadedThumbnail = await uploadOnCloudinary(localThumbnailPath);
    if (!uploadedThumbnail?.url) {
      throw new ApiError(500, "Thumbnail upload failed");
    }
    newThumbnail = uploadedThumbnail;
  }

  video.title = title.trim();
  video.description = description.trim();
  video.thumbnail = newThumbnail;

  await video.save();

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  //TODO: delete video
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this video");
  }

  await video.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      "You are not allowed to change the status of this video"
    );
  }

  video.isPublished = !video.isPublished;
  await video.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        video,
        `Video ${video.published ? "published" : "unpublished"} successfully`
      )
    );
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
