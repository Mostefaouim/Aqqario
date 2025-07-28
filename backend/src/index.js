import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import "express-async-errors";

import authRoutes from "./routes/auth.js";
import propertyRoutes from "./routes/properties.js";
import profileRoutes from "./routes/profiles.js";
import inquiryRoutes from "./routes/inquiries.js";
import favoriteRoutes from "./routes/favorites.js";
import uploadRoutes from "./routes/upload.js";

import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
});

// Security middleware
app.use(helmet());
app.use(limiter);

// CORS configuration
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsing middleware
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Aqqario API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/upload", uploadRoutes);

// Static files for uploads
app.use("/uploads", express.static("uploads"));

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Aqqario API server running on port ${PORT}`);
  console.log(
    `📖 API documentation available at http://localhost:${PORT}/health`
  );
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
