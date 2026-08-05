export const validate = (schema) => (req, res, next) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({
      success: false,
      message: "Request body is missing or not a valid JSON object"
    });
  }

  const result = schema.safeParse(req.body);

  if (!result.success) {
    const firstIssue = result.error.issues[0];
    return res.status(400).json({
      success: false,
      message: firstIssue?.message || "Validation failed",
      errors: result.error.flatten().fieldErrors
    });
  }

  next();
};

