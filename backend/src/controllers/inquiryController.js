import { supabase } from "../utils/supabase.js";
import {
  sendSuccess,
  sendError,
  validatePagination,
  buildPagination,
} from "../utils/response.js";

/**
 * Create a new inquiry
 */
export const createInquiry = async (req, res) => {
  const {
    propertyId,
    name,
    email,
    phone,
    message,
    inquiryType = "info",
  } = req.body;
  const userId = req.userId || null; // Optional for authenticated users

  try {
    // Check if property exists
    const { data: property, error: propertyError } = await supabase
      .from("properties")
      .select("id, title, agent_id")
      .eq("id", propertyId)
      .single();

    if (propertyError || !property) {
      return sendError(res, "Property not found", 404);
    }

    const { data: inquiry, error } = await supabase
      .from("inquiries")
      .insert({
        property_id: propertyId,
        user_id: userId,
        name,
        email,
        phone,
        message,
        inquiry_type: inquiryType,
        status: "pending",
      })
      .select(
        `
        *,
        properties:property_id (
          id,
          title,
          address,
          city,
          price,
          property_type
        )
      `
      )
      .single();

    if (error) {
      console.error("Inquiry creation error:", error);
      return sendError(res, "Failed to create inquiry", 400);
    }

    sendSuccess(res, "Inquiry submitted successfully", inquiry, 201);
  } catch (error) {
    console.error("Create inquiry error:", error);
    sendError(res, "Failed to submit inquiry", 500);
  }
};

/**
 * Get user's inquiries
 */
export const getUserInquiries = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status,
    inquiryType,
    sortBy = "created_at",
    sortOrder = "desc",
  } = req.query;
  const userId = req.userId;

  try {
    const {
      page: validPage,
      limit: validLimit,
      offset,
    } = validatePagination(page, limit);

    let query = supabase
      .from("inquiries")
      .select(
        `
        *,
        properties:property_id (
          id,
          title,
          address,
          city,
          price,
          property_type,
          images
        )
      `,
        { count: "exact" }
      )
      .eq("user_id", userId);

    // Apply filters
    if (status) {
      query = query.eq("status", status);
    }

    if (inquiryType) {
      query = query.eq("inquiry_type", inquiryType);
    }

    // Apply sorting and pagination
    const ascending = sortOrder === "asc";
    query = query
      .order(sortBy, { ascending })
      .range(offset, offset + validLimit - 1);

    const { data: inquiries, error, count } = await query;

    if (error) {
      console.error("User inquiries fetch error:", error);
      return sendError(res, "Failed to fetch inquiries", 500);
    }

    const pagination = buildPagination(validPage, validLimit, count || 0);

    sendSuccess(
      res,
      "Inquiries fetched successfully",
      inquiries,
      200,
      pagination
    );
  } catch (error) {
    console.error("Get user inquiries error:", error);
    sendError(res, "Failed to fetch inquiries", 500);
  }
};

/**
 * Get agent's received inquiries
 */
export const getAgentInquiries = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status,
    inquiryType,
    propertyId,
    sortBy = "created_at",
    sortOrder = "desc",
  } = req.query;
  const agentId = req.userId;

  try {
    const {
      page: validPage,
      limit: validLimit,
      offset,
    } = validatePagination(page, limit);

    let query = supabase
      .from("inquiries")
      .select(
        `
        *,
        properties:property_id!inner (
          id,
          title,
          address,
          city,
          price,
          property_type,
          images,
          agent_id
        )
      `,
        { count: "exact" }
      )
      .eq("properties.agent_id", agentId);

    // Apply filters
    if (status) {
      query = query.eq("status", status);
    }

    if (inquiryType) {
      query = query.eq("inquiry_type", inquiryType);
    }

    if (propertyId) {
      query = query.eq("property_id", propertyId);
    }

    // Apply sorting and pagination
    const ascending = sortOrder === "asc";
    query = query
      .order(sortBy, { ascending })
      .range(offset, offset + validLimit - 1);

    const { data: inquiries, error, count } = await query;

    if (error) {
      console.error("Agent inquiries fetch error:", error);
      return sendError(res, "Failed to fetch inquiries", 500);
    }

    const pagination = buildPagination(validPage, validLimit, count || 0);

    sendSuccess(
      res,
      "Inquiries fetched successfully",
      inquiries,
      200,
      pagination
    );
  } catch (error) {
    console.error("Get agent inquiries error:", error);
    sendError(res, "Failed to fetch inquiries", 500);
  }
};

/**
 * Update inquiry status (for agents)
 */
export const updateInquiryStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const agentId = req.userId;

  try {
    // Verify that the inquiry belongs to agent's property
    const { data: inquiry, error: fetchError } = await supabase
      .from("inquiries")
      .select(
        `
        id,
        properties:property_id (
          agent_id
        )
      `
      )
      .eq("id", id)
      .single();

    if (fetchError || !inquiry) {
      return sendError(res, "Inquiry not found", 404);
    }

    if (inquiry.properties.agent_id !== agentId) {
      return sendError(
        res,
        "You do not have permission to update this inquiry",
        403
      );
    }

    const { data: updatedInquiry, error } = await supabase
      .from("inquiries")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Inquiry status update error:", error);
      return sendError(res, "Failed to update inquiry status", 400);
    }

    sendSuccess(res, "Inquiry status updated successfully", updatedInquiry);
  } catch (error) {
    console.error("Update inquiry status error:", error);
    sendError(res, "Failed to update inquiry status", 500);
  }
};

/**
 * Delete an inquiry
 */
export const deleteInquiry = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const userRole = req.userRole;

  try {
    // Check if inquiry exists and user has permission
    const { data: inquiry, error: fetchError } = await supabase
      .from("inquiries")
      .select(
        `
        id,
        user_id,
        properties:property_id (
          agent_id
        )
      `
      )
      .eq("id", id)
      .single();

    if (fetchError || !inquiry) {
      return sendError(res, "Inquiry not found", 404);
    }

    // Check permissions (only inquiry creator, property agent, or admin can delete)
    const canDelete =
      inquiry.user_id === userId ||
      inquiry.properties.agent_id === userId ||
      userRole === "admin";

    if (!canDelete) {
      return sendError(
        res,
        "You do not have permission to delete this inquiry",
        403
      );
    }

    const { error } = await supabase.from("inquiries").delete().eq("id", id);

    if (error) {
      console.error("Inquiry deletion error:", error);
      return sendError(res, "Failed to delete inquiry", 400);
    }

    sendSuccess(res, "Inquiry deleted successfully");
  } catch (error) {
    console.error("Delete inquiry error:", error);
    sendError(res, "Failed to delete inquiry", 500);
  }
};
