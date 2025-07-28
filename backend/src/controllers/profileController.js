import { supabase } from "../utils/supabase.js";
import {
  sendSuccess,
  sendError,
  validatePagination,
  buildPagination,
} from "../utils/response.js";

/**
 * Get current user's profile
 */
export const getMyProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !profile) {
      return sendError(res, "Profile not found", 404);
    }

    sendSuccess(res, "Profile fetched successfully", profile);
  } catch (error) {
    console.error("Get profile error:", error);
    sendError(res, "Failed to fetch profile", 500);
  }
};

/**
 * Update current user's profile
 */
export const updateMyProfile = async (req, res) => {
  const userId = req.userId;
  const updateData = req.body;

  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      console.error("Profile update error:", error);
      return sendError(res, "Failed to update profile", 400);
    }

    sendSuccess(res, "Profile updated successfully", profile);
  } catch (error) {
    console.error("Update profile error:", error);
    sendError(res, "Failed to update profile", 500);
  }
};

/**
 * Get user profile by ID
 */
export const getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select(
        `
        id,
        first_name,
        last_name,
        email,
        phone,
        bio,
        agency_name,
        license_number,
        avatar_url,
        role,
        created_at
      `
      )
      .eq("id", id)
      .single();

    if (error || !profile) {
      return sendError(res, "Profile not found", 404);
    }

    // Get agent's properties count if user is an agent
    if (profile.role === "agent") {
      const { count } = await supabase
        .from("properties")
        .select("*", { count: "exact", head: true })
        .eq("agent_id", profile.id);

      profile.properties_count = count || 0;
    }

    sendSuccess(res, "Profile fetched successfully", profile);
  } catch (error) {
    console.error("Get public profile error:", error);
    sendError(res, "Failed to fetch profile", 500);
  }
};

/**
 * Get all agents (public profiles)
 */
export const getAgents = async (req, res) => {
  const { page = 1, limit = 10, city, agencyName } = req.query;

  try {
    const {
      page: validPage,
      limit: validLimit,
      offset,
    } = validatePagination(page, limit);

    let query = supabase
      .from("profiles")
      .select(
        `
        id,
        first_name,
        last_name,
        email,
        phone,
        bio,
        agency_name,
        license_number,
        avatar_url,
        created_at
      `,
        { count: "exact" }
      )
      .eq("role", "agent");

    // Apply filters
    if (agencyName) {
      query = query.ilike("agency_name", `%${agencyName}%`);
    }

    // Apply pagination
    query = query
      .order("created_at", { ascending: false })
      .range(offset, offset + validLimit - 1);

    const { data: agents, error, count } = await query;

    if (error) {
      console.error("Agents fetch error:", error);
      return sendError(res, "Failed to fetch agents", 500);
    }

    // Get properties count for each agent
    for (const agent of agents) {
      const { count: propertiesCount } = await supabase
        .from("properties")
        .select("*", { count: "exact", head: true })
        .eq("agent_id", agent.id)
        .eq("status", "available");

      agent.properties_count = propertiesCount || 0;
    }

    const pagination = buildPagination(validPage, validLimit, count || 0);

    sendSuccess(res, "Agents fetched successfully", agents, 200, pagination);
  } catch (error) {
    console.error("Get agents error:", error);
    sendError(res, "Failed to fetch agents", 500);
  }
};
