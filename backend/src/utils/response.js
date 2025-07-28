/**
 * Standard API response format
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Response message
 * @param {*} data - Response data
 * @param {Object} meta - Additional metadata
 */
export const sendResponse = (
  res,
  statusCode,
  message,
  data = null,
  meta = null
) => {
  const response = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
    meta,
    timestamp: new Date().toISOString(),
  };

  // Remove null values from response
  Object.keys(response).forEach((key) => {
    if (response[key] === null) {
      delete response[key];
    }
  });

  return res.status(statusCode).json(response);
};

/**
 * Send success response
 * @param {Object} res - Express response object
 * @param {string} message - Success message
 * @param {*} data - Response data
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {Object} meta - Additional metadata
 */
export const sendSuccess = (
  res,
  message,
  data = null,
  statusCode = 200,
  meta = null
) => {
  return sendResponse(res, statusCode, message, data, meta);
};

/**
 * Send error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default: 400)
 * @param {*} errors - Validation errors or additional error details
 */
export const sendError = (res, message, statusCode = 400, errors = null) => {
  const response = {
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString(),
  };

  // Remove null values from response
  Object.keys(response).forEach((key) => {
    if (response[key] === null) {
      delete response[key];
    }
  });

  return res.status(statusCode).json(response);
};

/**
 * Build pagination metadata
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @param {number} total - Total number of items
 * @returns {Object} Pagination metadata
 */
export const buildPagination = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);

  return {
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

/**
 * Validate pagination parameters
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Object} Validated pagination parameters
 */
export const validatePagination = (page = 1, limit = 10) => {
  const validatedPage = Math.max(1, parseInt(page) || 1);
  const validatedLimit = Math.min(100, Math.max(1, parseInt(limit) || 10));

  return {
    page: validatedPage,
    limit: validatedLimit,
    offset: (validatedPage - 1) * validatedLimit,
  };
};
