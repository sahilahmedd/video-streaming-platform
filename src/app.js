import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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

// routes Declaration
// We don't directly use the app.get or app.post here because it is not the best practice isteade we use app.use() and define a standard route and then define the specifice routes in a saperate file
app.use("/api/v1/users", userRouter)

// http://localhost:3000/user/api/v1/register => register route

export { app };
