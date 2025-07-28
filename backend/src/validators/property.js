import Joi from "joi";

// Property validation schemas
export const createPropertySchema = Joi.object({
  title: Joi.string().min(10).max(200).required().messages({
    "string.min": "Title must be at least 10 characters long",
    "string.max": "Title cannot exceed 200 characters",
    "any.required": "Title is required",
  }),
  description: Joi.string().min(50).max(2000).required().messages({
    "string.min": "Description must be at least 50 characters long",
    "string.max": "Description cannot exceed 2000 characters",
    "any.required": "Description is required",
  }),
  price: Joi.number().positive().required().messages({
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required",
  }),
  address: Joi.string().min(10).max(200).required().messages({
    "string.min": "Address must be at least 10 characters long",
    "string.max": "Address cannot exceed 200 characters",
    "any.required": "Address is required",
  }),
  city: Joi.string().min(2).max(100).required().messages({
    "string.min": "City must be at least 2 characters long",
    "string.max": "City cannot exceed 100 characters",
    "any.required": "City is required",
  }),
  state: Joi.string().min(2).max(100).optional(),
  zipCode: Joi.string().min(3).max(20).optional(),
  country: Joi.string().min(2).max(100).default("Morocco"),
  propertyType: Joi.string()
    .valid(
      "apartment",
      "house",
      "villa",
      "studio",
      "office",
      "shop",
      "warehouse",
      "land"
    )
    .required()
    .messages({
      "any.only":
        "Property type must be one of: apartment, house, villa, studio, office, shop, warehouse, land",
      "any.required": "Property type is required",
    }),
  listingType: Joi.string().valid("sale", "rent").required().messages({
    "any.only": "Listing type must be either sale or rent",
    "any.required": "Listing type is required",
  }),
  bedrooms: Joi.number().integer().min(0).max(20).optional(),
  bathrooms: Joi.number().min(0).max(20).optional(),
  area: Joi.number().positive().optional().messages({
    "number.positive": "Area must be a positive number",
  }),
  yearBuilt: Joi.number()
    .integer()
    .min(1800)
    .max(new Date().getFullYear() + 2)
    .optional(),
  parking: Joi.boolean().default(false),
  furnished: Joi.boolean().default(false),
  features: Joi.array().items(Joi.string().max(50)).max(20).optional(),
  images: Joi.array().items(Joi.string().uri()).max(20).optional(),
  latitude: Joi.number().min(-90).max(90).optional(),
  longitude: Joi.number().min(-180).max(180).optional(),
  status: Joi.string()
    .valid("available", "pending", "sold", "rented")
    .default("available"),
});

export const updatePropertySchema = Joi.object({
  title: Joi.string().min(10).max(200).optional(),
  description: Joi.string().min(50).max(2000).optional(),
  price: Joi.number().positive().optional(),
  address: Joi.string().min(10).max(200).optional(),
  city: Joi.string().min(2).max(100).optional(),
  state: Joi.string().min(2).max(100).optional(),
  zipCode: Joi.string().min(3).max(20).optional(),
  country: Joi.string().min(2).max(100).optional(),
  propertyType: Joi.string()
    .valid(
      "apartment",
      "house",
      "villa",
      "studio",
      "office",
      "shop",
      "warehouse",
      "land"
    )
    .optional(),
  listingType: Joi.string().valid("sale", "rent").optional(),
  bedrooms: Joi.number().integer().min(0).max(20).optional(),
  bathrooms: Joi.number().min(0).max(20).optional(),
  area: Joi.number().positive().optional(),
  yearBuilt: Joi.number()
    .integer()
    .min(1800)
    .max(new Date().getFullYear() + 2)
    .optional(),
  parking: Joi.boolean().optional(),
  furnished: Joi.boolean().optional(),
  features: Joi.array().items(Joi.string().max(50)).max(20).optional(),
  images: Joi.array().items(Joi.string().uri()).max(20).optional(),
  latitude: Joi.number().min(-90).max(90).optional(),
  longitude: Joi.number().min(-180).max(180).optional(),
  status: Joi.string()
    .valid("available", "pending", "sold", "rented")
    .optional(),
});

export const propertyQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  city: Joi.string().max(100).optional(),
  propertyType: Joi.string()
    .valid(
      "apartment",
      "house",
      "villa",
      "studio",
      "office",
      "shop",
      "warehouse",
      "land"
    )
    .optional(),
  listingType: Joi.string().valid("sale", "rent").optional(),
  minPrice: Joi.number().positive().optional(),
  maxPrice: Joi.number().positive().optional(),
  bedrooms: Joi.number().integer().min(0).optional(),
  bathrooms: Joi.number().min(0).optional(),
  minArea: Joi.number().positive().optional(),
  maxArea: Joi.number().positive().optional(),
  parking: Joi.boolean().optional(),
  furnished: Joi.boolean().optional(),
  status: Joi.string()
    .valid("available", "pending", "sold", "rented")
    .optional(),
  sortBy: Joi.string()
    .valid("price", "created_at", "area", "bedrooms")
    .default("created_at"),
  sortOrder: Joi.string().valid("asc", "desc").default("desc"),
  search: Joi.string().max(200).optional(),
});

export const propertyParamsSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "string.guid": "Invalid property ID format",
    "any.required": "Property ID is required",
  }),
});
