import { sendError } from "../utils/response.js";

/**
 * Global error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error("Error stack:", err.stack);

  // Joi validation errors
  if (err.isJoi) {
    const errors = err.details.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));
    return sendError(res, "Validation failed", 400, errors);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return sendError(res, "Invalid token", 401);
  }

  if (err.name === "TokenExpiredError") {
    return sendError(res, "Token expired", 401);
  }

  // Supabase errors
  if (err.message && err.message.includes("duplicate key")) {
    return sendError(res, "Resource already exists", 409);
  }

  // Multer errors (file upload)
  if (err.code === "LIMIT_FILE_SIZE") {
    return sendError(res, "File too large", 413);
  }

  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return sendError(res, "Too many files uploaded", 400);
  }

  // Default error response
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal server error";

  return sendError(res, message, statusCode);
};
