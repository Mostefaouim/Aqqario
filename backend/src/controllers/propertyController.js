import { supabase } from "../utils/supabase.js";
import {
  sendSuccess,
  sendError,
  validatePagination,
  buildPagination,
} from "../utils/response.js";

/**
 * Get all properties with filtering and pagination
 */
export const getProperties = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    city,
    propertyType,
    listingType,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    minArea,
    maxArea,
    parking,
    furnished,
    status = "available",
    sortBy = "created_at",
    sortOrder = "desc",
    search,
  } = req.query;

  try {
    const {
      page: validPage,
      limit: validLimit,
      offset,
    } = validatePagination(page, limit);

    // Build query
    let query = supabase.from("properties").select(
      `
        *,
        profiles:agent_id (
          id,
          first_name,
          last_name,
          email,
          phone,
          agency_name,
          avatar_url
        )
      `,
      { count: "exact" }
    );

    // Apply filters
    if (city) {
      query = query.ilike("city", `%${city}%`);
    }

    if (propertyType) {
      query = query.eq("property_type", propertyType);
    }

    if (listingType) {
      query = query.eq("listing_type", listingType);
    }

    if (minPrice) {
      query = query.gte("price", minPrice);
    }

    if (maxPrice) {
      query = query.lte("price", maxPrice);
    }

    if (bedrooms) {
      query = query.eq("bedrooms", bedrooms);
    }

    if (bathrooms) {
      query = query.gte("bathrooms", bathrooms);
    }

    if (minArea) {
      query = query.gte("area", minArea);
    }

    if (maxArea) {
      query = query.lte("area", maxArea);
    }

    if (parking !== undefined) {
      query = query.eq("parking", parking === "true");
    }

    if (furnished !== undefined) {
      query = query.eq("furnished", furnished === "true");
    }

    if (status) {
      query = query.eq("status", status);
    }

    // Search functionality
    if (search) {
      query = query.or(
        `title.ilike.%${search}%,description.ilike.%${search}%,address.ilike.%${search}%,city.ilike.%${search}%`
      );
    }

    // Apply sorting
    const ascending = sortOrder === "asc";
    query = query.order(sortBy, { ascending });

    // Apply pagination
    query = query.range(offset, offset + validLimit - 1);

    const { data: properties, error, count } = await query;

    if (error) {
      console.error("Properties fetch error:", error);
      return sendError(res, "Failed to fetch properties", 500);
    }

    const pagination = buildPagination(validPage, validLimit, count || 0);

    sendSuccess(
      res,
      "Properties fetched successfully",
      properties,
      200,
      pagination
    );
  } catch (error) {
    console.error("Get properties error:", error);
    sendError(res, "Failed to fetch properties", 500);
  }
};

/**
 * Get a single property by ID
 */
export const getProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: property, error } = await supabase
      .from("properties")
      .select(
        `
        *,
        profiles:agent_id (
          id,
          first_name,
          last_name,
          email,
          phone,
          agency_name,
          avatar_url,
          bio
        )
      `
      )
      .eq("id", id)
      .single();

    if (error || !property) {
      return sendError(res, "Property not found", 404);
    }

    sendSuccess(res, "Property fetched successfully", property);
  } catch (error) {
    console.error("Get property error:", error);
    sendError(res, "Failed to fetch property", 500);
  }
};

/**
 * Create a new property
 */
export const createProperty = async (req, res) => {
  const propertyData = req.body;
  const agentId = req.userId;

  try {
    const { data: property, error } = await supabase
      .from("properties")
      .insert({
        ...propertyData,
        agent_id: agentId,
      })
      .select()
      .single();

    if (error) {
      console.error("Property creation error:", error);
      return sendError(res, "Failed to create property", 400);
    }

    sendSuccess(res, "Property created successfully", property, 201);
  } catch (error) {
    console.error("Create property error:", error);
    sendError(res, "Failed to create property", 500);
  }
};

/**
 * Update a property
 */
export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const userId = req.userId;
  const userRole = req.userRole;

  try {
    // Check if property exists and user has permission
    const { data: existingProperty, error: fetchError } = await supabase
      .from("properties")
      .select("agent_id")
      .eq("id", id)
      .single();

    if (fetchError || !existingProperty) {
      return sendError(res, "Property not found", 404);
    }

    // Check permissions (only property owner or admin can update)
    if (existingProperty.agent_id !== userId && userRole !== "admin") {
      return sendError(
        res,
        "You do not have permission to update this property",
        403
      );
    }

    const { data: property, error } = await supabase
      .from("properties")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Property update error:", error);
      return sendError(res, "Failed to update property", 400);
    }

    sendSuccess(res, "Property updated successfully", property);
  } catch (error) {
    console.error("Update property error:", error);
    sendError(res, "Failed to update property", 500);
  }
};

/**
 * Delete a property
 */
export const deleteProperty = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const userRole = req.userRole;

  try {
    // Check if property exists and user has permission
    const { data: existingProperty, error: fetchError } = await supabase
      .from("properties")
      .select("agent_id")
      .eq("id", id)
      .single();

    if (fetchError || !existingProperty) {
      return sendError(res, "Property not found", 404);
    }

    // Check permissions (only property owner or admin can delete)
    if (existingProperty.agent_id !== userId && userRole !== "admin") {
      return sendError(
        res,
        "You do not have permission to delete this property",
        403
      );
    }

    const { error } = await supabase.from("properties").delete().eq("id", id);

    if (error) {
      console.error("Property deletion error:", error);
      return sendError(res, "Failed to delete property", 400);
    }

    sendSuccess(res, "Property deleted successfully");
  } catch (error) {
    console.error("Delete property error:", error);
    sendError(res, "Failed to delete property", 500);
  }
};

/**
 * Get properties by agent
 */
export const getAgentProperties = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const agentId = req.userId;

  try {
    const {
      page: validPage,
      limit: validLimit,
      offset,
    } = validatePagination(page, limit);

    const {
      data: properties,
      error,
      count,
    } = await supabase
      .from("properties")
      .select("*", { count: "exact" })
      .eq("agent_id", agentId)
      .order("created_at", { ascending: false })
      .range(offset, offset + validLimit - 1);

    if (error) {
      console.error("Agent properties fetch error:", error);
      return sendError(res, "Failed to fetch your properties", 500);
    }

    const pagination = buildPagination(validPage, validLimit, count || 0);

    sendSuccess(
      res,
      "Your properties fetched successfully",
      properties,
      200,
      pagination
    );
  } catch (error) {
    console.error("Get agent properties error:", error);
    sendError(res, "Failed to fetch your properties", 500);
  }
};
