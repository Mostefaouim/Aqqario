import Joi from "joi";

// Inquiry validation schemas
export const createInquirySchema = Joi.object({
  propertyId: Joi.string().uuid().required().messages({
    "string.guid": "Invalid property ID format",
    "any.required": "Property ID is required",
  }),
  name: Joi.string().min(2).max(100).required().messages({
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 100 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  phone: Joi.string()
    .pattern(/^[+]?[1-9][\d\s\-\(\)]{7,15}$/)
    .optional()
    .messages({
      "string.pattern.base": "Please provide a valid phone number",
    }),
  message: Joi.string().min(10).max(1000).required().messages({
    "string.min": "Message must be at least 10 characters long",
    "string.max": "Message cannot exceed 1000 characters",
    "any.required": "Message is required",
  }),
  inquiryType: Joi.string()
    .valid("viewing", "info", "offer", "other")
    .default("info"),
});

export const updateInquiryStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "contacted", "viewed", "closed", "spam")
    .required()
    .messages({
      "any.only":
        "Status must be one of: pending, contacted, viewed, closed, spam",
      "any.required": "Status is required",
    }),
});

export const inquiryQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  status: Joi.string()
    .valid("pending", "contacted", "viewed", "closed", "spam")
    .optional(),
  inquiryType: Joi.string()
    .valid("viewing", "info", "offer", "other")
    .optional(),
  propertyId: Joi.string().uuid().optional(),
  sortBy: Joi.string()
    .valid("created_at", "updated_at", "status")
    .default("created_at"),
  sortOrder: Joi.string().valid("asc", "desc").default("desc"),
});

export const inquiryParamsSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "string.guid": "Invalid inquiry ID format",
    "any.required": "Inquiry ID is required",
  }),
});
