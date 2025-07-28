import express from "express";
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getAgentProperties,
} from "../controllers/propertyController.js";
import { authenticate, authorize, optionalAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validation.js";
import {
  createPropertySchema,
  updatePropertySchema,
  propertyQuerySchema,
  propertyParamsSchema,
} from "../validators/property.js";

const router = express.Router();

// @route   GET /api/properties
// @desc    Get all properties with filtering
// @access  Public
router.get(
  "/",
  validate(propertyQuerySchema, "query"),
  optionalAuth,
  getProperties
);

// @route   GET /api/properties/my-properties
// @desc    Get current agent's properties
// @access  Private (Agent only)
router.get(
  "/my-properties",
  authenticate,
  authorize(["agent", "admin"]),
  getAgentProperties
);

// @route   GET /api/properties/:id
// @desc    Get a single property by ID
// @access  Public
router.get(
  "/:id",
  validate(propertyParamsSchema, "params"),
  optionalAuth,
  getProperty
);

// @route   POST /api/properties
// @desc    Create a new property
// @access  Private (Agent only)
router.post(
  "/",
  authenticate,
  authorize(["agent", "admin"]),
  validate(createPropertySchema),
  createProperty
);

// @route   PUT /api/properties/:id
// @desc    Update a property
// @access  Private (Property owner or Admin)
router.put(
  "/:id",
  authenticate,
  validate(propertyParamsSchema, "params"),
  validate(updatePropertySchema),
  updateProperty
);

// @route   DELETE /api/properties/:id
// @desc    Delete a property
// @access  Private (Property owner or Admin)
router.delete(
  "/:id",
  authenticate,
  validate(propertyParamsSchema, "params"),
  deleteProperty
);

export default router;
