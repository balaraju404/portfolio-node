const routes = require("express").Router()
const { body, validationResult } = require("express-validator")
const controller = require("../controller/section-master")

const FIELD_TYPES = [
 "text",
 "textarea",
 "number",
 "image",
 "file",
 "select",
 "checkbox",
 "date",
 "repeatable"
]

const validateRequest = (req, res, next) => {
 const errors = validationResult(req)
 if (!errors.isEmpty()) {
  return res.status(400).json({ status: false, errors: errors.array() })
 }
 next()
}


/* Validate dynamic fields */
const validateFields = (fieldsPath = "fields") => {
 return body(fieldsPath).isArray({ min: 1 }).withMessage("Fields must be a non-empty array")
}

/* Create Section Validation */

const createValidation = [
 body("name").trim().isString().isLength({ min: 3, max: 100 }).withMessage("Section name must be between 3 and 100 characters"),
 body("type").trim().isString().matches(/^[a-z_]+$/).withMessage("Section type must contain only lowercase letters and underscore"),
 body("description").optional().trim().isString().isLength({ max: 500 }).withMessage("Description cannot exceed 500 characters"),
 body("icon").optional().trim().isString().withMessage("Icon must be string"),
 body("fields").isArray({ min: 1 }).withMessage("Fields must be a non-empty array"),
 body("fields.*.key").trim().isString().matches(/^[a-z_]+$/).withMessage("Field key must contain lowercase letters and underscore"),
 body("fields.*.label").trim().isString().notEmpty().withMessage("Field label required"),
 body("fields.*.type").isIn(FIELD_TYPES).withMessage("Invalid field type"),
 body("fields.*.required").optional().isBoolean().withMessage("Required must be boolean"),
 body("fields.*.validation").optional().isObject().withMessage("Validation must be object"),
 body("fields.*.children").optional().isArray().withMessage("Children must be array"),
 body("fields.*.children.*.key").optional().isString().withMessage("Child key must be string"),
 body("fields.*.children.*.label").optional().isString().withMessage("Child label must be string"),
 body("fields.*.children.*.type").optional().isIn(FIELD_TYPES).withMessage("Invalid child field type"),
 body("settings").optional().isObject().withMessage("Settings must be object"),
 body("settings.sortable").optional().isBoolean().withMessage("settings.sortable must be boolean"),
 body("settings.multiple").optional().isBoolean().withMessage("settings.multiple must be boolean"),
 body("settings.removable").optional().isBoolean().withMessage("settings.removable must be boolean")
]

/* Update Validation */
const updateValidation = [
 body("section_id").isMongoId().withMessage("Invalid section id"),
 body("name").optional().trim().isString().isLength({ min: 3, max: 100 }).withMessage("Invalid section name"),
 body("description").optional().isString().isLength({ max: 500 }).withMessage("Invalid description"),
 body("fields").optional().isArray({ min: 1 }).withMessage("Fields must be array"),
 body("fields.*.key").optional().isString().withMessage("Field key must be string"),
 body("fields.*.type").optional().isIn(FIELD_TYPES).withMessage("Invalid field type"),
 body("settings").optional().isObject().withMessage("Settings must be object"),
 body("status").optional().isIn([0, 1]).withMessage("Status must be 0 or 1")
]

// Admin
routes.post("/create", createValidation, validateRequest, controller.create)
routes.post("/update", updateValidation, validateRequest, controller.update)
routes.delete("/remove/:section_id", controller.remove)

// User
routes.post("/list", controller.list)
routes.get("/details/:section_id", controller.details)

module.exports = routes