import { verifyToken, extractToken } from "../utils/auth.js";
import { supabase } from "../utils/supabase.js";
import { sendError } from "../utils/response.js";

/**
 * Authentication middleware
 * Verifies JWT token and fetches user information
 */
export const authenticate = async (req, res, next) => {
  try {
    const token = extractToken(req.headers.authorization);

    if (!token) {
      return sendError(res, "Access token is required", 401);
    }

    // Verify JWT token
    const decoded = verifyToken(token);

    // Get user from Supabase
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return sendError(res, "Invalid or expired token", 401);
    }

    // Attach user to request object
    req.user = user.user;
    req.userId = user.user.id;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return sendError(res, "Invalid or expired token", 401);
  }
};

/**
 * Optional authentication middleware
 * Checks for token but doesn't require it
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const token = extractToken(req.headers.authorization);

    if (token) {
      // Verify JWT token
      const decoded = verifyToken(token);

      // Get user from Supabase
      const { data: user, error } = await supabase.auth.getUser(token);

      if (!error && user) {
        req.user = user.user;
        req.userId = user.user.id;
      }
    }

    next();
  } catch (error) {
    // Continue without user if token is invalid
    next();
  }
};

/**
 * Role-based authorization middleware
 * @param {string[]} allowedRoles - Array of allowed roles
 */
export const authorize = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      if (!req.userId) {
        return sendError(res, "Authentication required", 401);
      }

      // Get user profile to check role
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", req.userId)
        .single();

      if (error || !profile) {
        return sendError(res, "User profile not found", 404);
      }

      const userRole = profile.role || "user";

      // Check if user has required role
      if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        return sendError(res, "Insufficient permissions", 403);
      }

      req.userRole = userRole;
      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return sendError(res, "Authorization failed", 500);
    }
  };
};
