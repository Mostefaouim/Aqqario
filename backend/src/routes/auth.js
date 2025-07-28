import express from "express";
import {
  register,
  registerAgency,
  login,
  refreshToken,
  logout,
} from "../controllers/authController.js";
import { validate } from "../middleware/validation.js";
import {
  registerSchema,
  agencyRegisterSchema,
  loginSchema,
  refreshTokenSchema,
} from "../validators/auth.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", validate(registerSchema), register);

// @route   POST /api/auth/register-agency
// @desc    Register a new agency/agent
// @access  Public
router.post("/register-agency", validate(agencyRegisterSchema), registerAgency);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", validate(loginSchema), login);

// @route   POST /api/auth/refresh
// @desc    Refresh authentication token
// @access  Public
router.post("/refresh", validate(refreshTokenSchema), refreshToken);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Public
router.post("/logout", logout);

export default router;
