export function errorHandler(err, req, res, next) {
 const statusCode = err.statusCode || 400
 const message = err.message || "Something went wrong"

 res.status(statusCode).json({
  success: false,
  error: message,
 })
}