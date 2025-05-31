import { ApiError } from "../utils/ApiError.js";  // Adjust path accordingly

// Global Error Handling Middleware
function globalErrorHandler(err, req, res, next) {
  console.error(err); // Always log the error for debugging

  if (err instanceof ApiError) {
    // Custom API error, send formatted JSON response
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  }

  // For any other unhandled errors, send generic response
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}

export default globalErrorHandler;
