import express from "express";
import {
  createInquiry,
  getUserInquiries,
  getAgentInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from "../controllers/inquiryController.js";
import { authenticate, authorize, optionalAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validation.js";
import {
  createInquirySchema,
  updateInquiryStatusSchema,
  inquiryQuerySchema,
  inquiryParamsSchema,
} from "../validators/inquiry.js";

const router = express.Router();

// @route   POST /api/inquiries
// @desc    Create a new inquiry
// @access  Public (but better experience when authenticated)
router.post("/", optionalAuth, validate(createInquirySchema), createInquiry);

// @route   GET /api/inquiries/my-inquiries
// @desc    Get current user's inquiries
// @access  Private
router.get(
  "/my-inquiries",
  authenticate,
  validate(inquiryQuerySchema, "query"),
  getUserInquiries
);

// @route   GET /api/inquiries/agent-inquiries
// @desc    Get current agent's received inquiries
// @access  Private (Agent only)
router.get(
  "/agent-inquiries",
  authenticate,
  authorize(["agent", "admin"]),
  validate(inquiryQuerySchema, "query"),
  getAgentInquiries
);

// @route   PUT /api/inquiries/:id/status
// @desc    Update inquiry status
// @access  Private (Agent or Admin)
router.put(
  "/:id/status",
  authenticate,
  authorize(["agent", "admin"]),
  validate(inquiryParamsSchema, "params"),
  validate(updateInquiryStatusSchema),
  updateInquiryStatus
);

// @route   DELETE /api/inquiries/:id
// @desc    Delete an inquiry
// @access  Private (Inquiry creator, Property agent, or Admin)
router.delete(
  "/:id",
  authenticate,
  validate(inquiryParamsSchema, "params"),
  deleteInquiry
);

export default router;
