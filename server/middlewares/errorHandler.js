// Custom AppError class for operational errors
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Global Error Handling Middleware
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || null;

  // 1. Handle Invalid JSON Body Syntax Error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = "Invalid or empty JSON body format.";
  }

  // 2. Handle PostgreSQL Database Errors
  if (err.code) {
    switch (err.code) {
      case '23505': // Unique violation
        statusCode = 409;
        message = "Duplicate record already exists in database.";
        break;
      case '23502': // Not null violation
        statusCode = 400;
        message = "Required database field is missing.";
        break;
      case '22P02': // Invalid data input
        statusCode = 400;
        message = "Invalid data input format.";
        break;
      default:
        break;
    }
  }

  // 3. Handle JWT Authentication Errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = "Invalid token. Authorization failed.";
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = "Token has expired. Please log in again.";
  }

  // 4. Handle Zod Validation Errors
  if (err.name === 'ZodError') {
    statusCode = 400;
    message = err.issues?.[0]?.message || "Validation Error";
    errors = err.issues?.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message
    }));
  }

  // Log error on server
  console.error(`[Global Error] ${req.method} ${req.originalUrl}:`, err.message || err);

  // Return clean JSON response
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
