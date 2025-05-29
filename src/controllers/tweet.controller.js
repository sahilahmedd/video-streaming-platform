import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet

  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "Content is required");
  }

  const user = await User.findById(req.user?._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(400, "User dosen't exist");
  }

  const tweet = await Tweet.create({
    content,
    owner: user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, tweet, "Tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError("User dosen't exist");
  }

  const tweets = await Tweet.find({ owner: req.user._id }).populate(
    "owner",
    "fullname"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, tweets, "Tweets fetched successfully"));
});

const getAnyUserTweets = asyncHandler(async (req, res) =>{
  const { userID } = req.params;

  if(!isValidObjectId(userID)){
    throw new ApiError(400, "Invalid User ID")
  }

  const userExist = await User.findById(userID);

  if(!userExist) {
    throw new ApiError(404, "User not found")
  }

  const tweet = await Tweet.find({owner: userID}).populate("owner", "fullname")

  return res
  .status(200)
  .json(
    new ApiResponse(200, "Tweets fetched successfully")
  )

})

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet

  const { content } = req.body;
  const { tweetId } = req.params;

  if (!content) {
    throw new ApiError(404, "Add content to update");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  if (tweet.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to update this tweet");
  }

  tweet.content = content;
  await tweet.save();

  return res
    .status(201)
    .json(new ApiResponse(201, tweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet

  const { tweetId } = req.params;

  if(!isValidObjectId(tweetId)){
    throw new ApiError(400, "Invalid Tweet ID")
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  if (tweet.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this Tweet");
  }

  await tweet.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Tweet deleted successfully"));
});

export { createTweet, getUserTweets, getAnyUserTweets, updateTweet, deleteTweet };
