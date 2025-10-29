require("dotenv").config()

global.PORT = process.env.PORT
global.ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS


global.MONGODB_URL = process.env.MONGODB_URL
global.MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME
global.MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD
global.MONGO_DB_HOST = process.env.MONGO_DB_HOST
global.MONGO_DB_NAME = process.env.MONGO_DB_NAME

// Status codes
global.SUCCESS_CODE = 200
global.INVALID_REQUEST_CODE = 400
global.AUTH_ERROR_CODE = 401
global.FORBIDDEN_CODE = 403
global.NOT_FOUND_CODE = 404
global.DUPLICATE_ENTRY_CODE = 409
global.VALIDATION_ERROR_CODE = 422
global.SERVER_ERROR_CODE = 500
global.SERVICE_UNAVAILABLE_CODE = 503

// Response messages
global.AUTH_ERROR_MESSAGE = "Authentication failed"
global.FORBIDDEN_MESSAGE = "Access denied"
global.NOT_FOUND_MESSAGE = "Resource not found"
global.DUPLICATE_ENTRY_MESSAGE = "Duplicate entry found"
global.INSERT_SUCCESS = "Data inserted successfully"
global.INSERT_FAILED = "Data insertion failed"
global.UPDATE_SUCCESS = "Data updated successfully"
global.UPDATE_FAILED = "Data updation failed"
global.DELETE_SUCCESS = "Data deleted successfully"
global.DELETE_FAILED = "Data deletion failed"
global.VALIDATION_ERROR_MESSAGE = "Validation failed. Please check your input."
global.SERVER_ERROR_MESSAGE = "Internal server error. Please try again later."
global.SERVICE_UNAVAILABLE_MESSAGE = "Service is temporarily unavailable. Please try again later."