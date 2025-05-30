import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one like per user per entity
likeSchema.index({ likedBy: 1, video: 1 }, { unique: true, sparse: true });
likeSchema.index({ likedBy: 1, comment: 1 }, { unique: true, sparse: true });
likeSchema.index({ likedBy: 1, tweet: 1 }, { unique: true, sparse: true });

// Validate only one of video/comment/tweet is set
likeSchema.pre("save", function (next) {
  const targets = [this.video, this.comment, this.tweet].filter(Boolean);
  if (targets.length !== 1) {
    return next(
      new Error(
        "Like must reference exactly one target: video, comment, or tweet."
      )
    );
  }
  next();
});

export const Like = mongoose.model("Like", likeSchema);
