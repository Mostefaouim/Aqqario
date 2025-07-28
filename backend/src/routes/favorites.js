import express from "express";
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  checkFavoriteStatus,
} from "../controllers/favoriteController.js";
import { authenticate } from "../middleware/auth.js";
import { validate } from "../middleware/validation.js";
import {
  addFavoriteSchema,
  favoriteParamsSchema,
  favoriteQuerySchema,
} from "../validators/favorite.js";

const router = express.Router();

// @route   GET /api/favorites
// @desc    Get user's favorite properties
// @access  Private
router.get(
  "/",
  authenticate,
  validate(favoriteQuerySchema, "query"),
  getFavorites
);

// @route   POST /api/favorites
// @desc    Add property to favorites
// @access  Private
router.post("/", authenticate, validate(addFavoriteSchema), addToFavorites);

// @route   GET /api/favorites/:propertyId/status
// @desc    Check if property is in user's favorites
// @access  Private
router.get(
  "/:propertyId/status",
  authenticate,
  validate(favoriteParamsSchema, "params"),
  checkFavoriteStatus
);

// @route   DELETE /api/favorites/:propertyId
// @desc    Remove property from favorites
// @access  Private
router.delete(
  "/:propertyId",
  authenticate,
  validate(favoriteParamsSchema, "params"),
  removeFromFavorites
);

export default router;
