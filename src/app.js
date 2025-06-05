import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

// Initilzating the express app
const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Express configuration to accept DATA
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser()); //To manage cookies CRUD opreations

// routes Import
import userRouter from "./routes/user.routes.js";
import likeRouter from "./routes/likes.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import commentRouter from "./routes/comment.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import healthRouter from "./routes/healthcheck.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"

// routes Declaration
// We don't directly use the app.get or app.post here because it is not the best practice insteade we use app.use() and define a standard route and then define the specifice routes in a saperate file
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", likeRouter);
app.use("/api/v1/users", tweetRouter);
app.use("/api/v1/users", healthRouter);
app.use("/api/v1/users", commentRouter);
app.use("/api/v1/users", playlistRouter);
app.use("/api/v1/users", subscriptionRouter);

// http://localhost:3000/user/api/v1/register => register route

app.use(globalErrorHandler);
export { app };
