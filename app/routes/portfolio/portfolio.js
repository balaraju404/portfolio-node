const routes = require("express").Router()
const { body, validationResult } = require("express-validator")
const portfolioController = require("../../controller/portfolio/portfolio")

const portfolioValidationRules = [
 body("user_id").isMongoId().withMessage("Invalid User Id"),
 body("portfolio_name").trim().isString().isLength({ min: 6 }).withMessage("Portfolio name must be at least 6 characters long"),

 // --- User Info ---
 body("user_info").isObject().withMessage("user_info must be an object"),
 body("user_info.name").trim().isString().isLength({ min: 3 }).withMessage("user_info.name must be at least 3 characters long"),
 body("user_info.role").trim().isString().isLength({ min: 3 }).withMessage("user_info.role must be at least 3 characters long"),
 body("user_info.about").trim().isString().isLength({ min: 20 }).withMessage("user_info.about must be at least 20 characters long"),
 body("user_info.img").optional().trim().isString().withMessage("user_info.img must be a string"),

 // --- Services ---
 body("services").optional().isArray({ min: 1 }).withMessage("services must be a non-empty array if provided"),
 body("services.*.id").if(body("services").exists()).isInt({ gt: 0 }).withMessage("service id must be a integer"),
 body("services.*.title").if(body("services").exists()).trim().isString().isLength({ min: 1 }).withMessage("service title must be a string"),
 body("services.*.description").if(body("services").exists()).isArray({ min: 1 }).withMessage("service description must be a array"),
 body("services.*.description.*").if(body("services").exists()).trim().isString().withMessage("service description value must be a string"),

 // --- Projects ---
 body("projects").optional().isArray({ min: 1 }).withMessage("projects must be a non-empty array if provided"),
 body("projects.*.id").if(body("services").exists()).isInt({ gt: 0 }).withMessage("project id must be a integer"),
 body("projects.*.title").if(body("projects").exists()).trim().isString().withMessage("project title must be a string"),
 body("projects.*.description").if(body("projects").exists()).trim().isString().withMessage("project description must be a string"),
 body("projects.*.teck_stack").if(body("projects").exists()).optional().isArray().withMessage("teck_stack must be an array if provided"),
 body("projects.*.teck_stack.*.cat_name").if(body("projects").exists()).trim().isString().withMessage("category name must be a string"),
 body("projects.*.teck_stack.*.skills").if(body("projects").exists()).isArray().withMessage("skills must be an array"),

 // --- Contact Info ---
 body("contact_info").optional().isObject().withMessage("contact_info must be an object if provided"),
 body("contact_info.mobile_no").if(body("contact_info").exists()).trim().isString().isLength({ min: 10, max: 15 }).withMessage("Mobile number must be a valid phone number"),
 body("contact_info.alternative_number").if(body("contact_info").exists()).optional().trim().isString().isLength({ min: 10, max: 15 }).withMessage("Alternative number must be a valid phone number"),
 body("contact_info.email").if(body("contact_info").exists()).isEmail().withMessage("Email must be a valid email"),
 body("contact_info.alternative_email").if(body("contact_info").exists()).optional().isEmail().withMessage("Alternative email must be a valid email"),
 body("contact_info.address").if(body("contact_info").exists()).trim().isString().isLength({ min: 10 }).withMessage("Invalid Address"),
]

routes.post("/create", portfolioValidationRules, (req, res, next) => {
 const errors = validationResult(req)
 if (!errors.isEmpty()) return res.status(VALIDATION_ERROR_CODE).json({ status: false, errors: errors })
 portfolioController.create(req, res, next)
})

routes.post("/get", [], (req, res, next) => {
 portfolioController.details(req, res, next)
})

module.exports = routes