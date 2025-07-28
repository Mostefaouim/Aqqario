import Joi from "joi";

// Favorite validation schemas
export const addFavoriteSchema = Joi.object({
  propertyId: Joi.string().uuid().required().messages({
    "string.guid": "Invalid property ID format",
    "any.required": "Property ID is required",
  }),
});

export const favoriteParamsSchema = Joi.object({
  propertyId: Joi.string().uuid().required().messages({
    "string.guid": "Invalid property ID format",
    "any.required": "Property ID is required",
  }),
});

export const favoriteQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sortBy: Joi.string().valid("created_at").default("created_at"),
  sortOrder: Joi.string().valid("asc", "desc").default("desc"),
});
