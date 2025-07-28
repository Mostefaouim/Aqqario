import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { sendSuccess, sendError } from "../utils/response.js";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, `property-${uniqueSuffix}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Allow only image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
    files: 10, // Maximum 10 files
  },
});

/**
 * Upload property images
 */
export const uploadPropertyImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return sendError(res, "No files uploaded", 400);
    }

    const uploadedFiles = req.files.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: `${process.env.API_BASE_URL || "http://localhost:3001"}/uploads/${
        file.filename
      }`,
    }));

    sendSuccess(
      res,
      "Files uploaded successfully",
      {
        files: uploadedFiles,
        count: uploadedFiles.length,
      },
      201
    );
  } catch (error) {
    console.error("File upload error:", error);
    sendError(res, "Failed to upload files", 500);
  }
};
