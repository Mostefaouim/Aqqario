import { supabase } from "../utils/supabase.js";
import {
  sendSuccess,
  sendError,
  validatePagination,
  buildPagination,
} from "../utils/response.js";

/**
 * Get user's favorite properties
 */
export const getFavorites = async (req, res) => {
  const {
    page = 1,
    limit = 10,
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

    const ascending = sortOrder === "asc";

    const {
      data: favorites,
      error,
      count,
    } = await supabase
      .from("favorites")
      .select(
        `
        id,
        created_at,
        properties:property_id (
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
        )
      `,
        { count: "exact" }
      )
      .eq("user_id", userId)
      .order(sortBy, { ascending })
      .range(offset, offset + validLimit - 1);

    if (error) {
      console.error("Favorites fetch error:", error);
      return sendError(res, "Failed to fetch favorites", 500);
    }

    const pagination = buildPagination(validPage, validLimit, count || 0);

    sendSuccess(
      res,
      "Favorites fetched successfully",
      favorites,
      200,
      pagination
    );
  } catch (error) {
    console.error("Get favorites error:", error);
    sendError(res, "Failed to fetch favorites", 500);
  }
};

/**
 * Add property to favorites
 */
export const addToFavorites = async (req, res) => {
  const { propertyId } = req.body;
  const userId = req.userId;

  try {
    // Check if property exists
    const { data: property, error: propertyError } = await supabase
      .from("properties")
      .select("id")
      .eq("id", propertyId)
      .single();

    if (propertyError || !property) {
      return sendError(res, "Property not found", 404);
    }

    // Check if already in favorites
    const { data: existingFavorite, error: checkError } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", userId)
      .eq("property_id", propertyId)
      .single();

    if (existingFavorite) {
      return sendError(res, "Property is already in favorites", 409);
    }

    const { data: favorite, error } = await supabase
      .from("favorites")
      .insert({
        user_id: userId,
        property_id: propertyId,
      })
      .select(
        `
        id,
        created_at,
        properties:property_id (
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
        )
      `
      )
      .single();

    if (error) {
      console.error("Add to favorites error:", error);
      return sendError(res, "Failed to add property to favorites", 400);
    }

    sendSuccess(res, "Property added to favorites successfully", favorite, 201);
  } catch (error) {
    console.error("Add to favorites error:", error);
    sendError(res, "Failed to add property to favorites", 500);
  }
};

/**
 * Remove property from favorites
 */
export const removeFromFavorites = async (req, res) => {
  const { propertyId } = req.params;
  const userId = req.userId;

  try {
    // Check if favorite exists
    const { data: favorite, error: fetchError } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", userId)
      .eq("property_id", propertyId)
      .single();

    if (fetchError || !favorite) {
      return sendError(res, "Property not found in favorites", 404);
    }

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("property_id", propertyId);

    if (error) {
      console.error("Remove from favorites error:", error);
      return sendError(res, "Failed to remove property from favorites", 400);
    }

    sendSuccess(res, "Property removed from favorites successfully");
  } catch (error) {
    console.error("Remove from favorites error:", error);
    sendError(res, "Failed to remove property from favorites", 500);
  }
};

/**
 * Check if property is in user's favorites
 */
export const checkFavoriteStatus = async (req, res) => {
  const { propertyId } = req.params;
  const userId = req.userId;

  try {
    const { data: favorite, error } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", userId)
      .eq("property_id", propertyId)
      .single();

    const isFavorite = !error && favorite;

    sendSuccess(res, "Favorite status retrieved successfully", {
      propertyId,
      isFavorite,
    });
  } catch (error) {
    console.error("Check favorite status error:", error);
    sendError(res, "Failed to check favorite status", 500);
  }
};
