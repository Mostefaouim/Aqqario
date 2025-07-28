import Joi from "joi";

// Profile validation schemas
export const updateProfileSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).optional(),
  lastName: Joi.string().min(2).max(50).optional(),
  phone: Joi.string()
    .pattern(/^[+]?[1-9][\d\s\-\(\)]{7,15}$/)
    .optional()
    .messages({
      "string.pattern.base": "Please provide a valid phone number",
    }),
  bio: Joi.string().max(500).optional(),
  agencyName: Joi.string().min(2).max(100).optional(),
  licenseNumber: Joi.string().min(3).max(50).optional(),
  avatarUrl: Joi.string().uri().optional().messages({
    "string.uri": "Avatar URL must be a valid URL",
  }),
});

export const profileParamsSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "string.guid": "Invalid profile ID format",
    "any.required": "Profile ID is required",
  }),
});
