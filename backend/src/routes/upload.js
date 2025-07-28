import express from "express";
import {
  upload,
  uploadPropertyImages,
} from "../controllers/uploadController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// @route   POST /api/upload/property-images
// @desc    Upload property images
// @access  Private (Agent only)
router.post(
  "/property-images",
  authenticate,
  authorize(["agent", "admin"]),
  upload.array("images", 10),
  uploadPropertyImages
);

export default router;
