export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message || err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Something went wrong on the server.";

  return res.status(statusCode).json({
    success: false,
    message: message
  });
};
