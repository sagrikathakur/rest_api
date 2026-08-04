export const validate = (schema) => (req, res, next) => {
  const validationResult = schema.safeParse(req.body);
  if (!validationResult.success) {
    const firstErrorMsg = validationResult.error.issues[0]?.message || "Validation failed";
    const formattedErrors = validationResult.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message
    }));

    return res.status(400).json({
      success: false,
      message: firstErrorMsg,
      errors: formattedErrors
    });
  }

  req.validatedBody = validationResult.data;
  next();
};
