import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  getProfile,
  getAgents,
} from "../controllers/profileController.js";
import { authenticate, optionalAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validation.js";
import {
  updateProfileSchema,
  profileParamsSchema,
} from "../validators/profile.js";

const router = express.Router();

// @route   GET /api/profiles/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", authenticate, getMyProfile);

// @route   PUT /api/profiles/me
// @desc    Update current user's profile
// @access  Private
router.put("/me", authenticate, validate(updateProfileSchema), updateMyProfile);

// @route   GET /api/profiles/agents
// @desc    Get all agents (public profiles)
// @access  Public
router.get("/agents", optionalAuth, getAgents);

// @route   GET /api/profiles/:id
// @desc    Get user profile by ID
// @access  Public
router.get(
  "/:id",
  validate(profileParamsSchema, "params"),
  optionalAuth,
  getProfile
);

export default router;
