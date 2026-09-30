const routes = require("express").Router()
const portfolioController = require("../../controller/portfolio/portfolio")
const { body, validationResult } = require("express-validator")

const sectionTypes = [
 "hero",
 "about",
 "skills",
 "experience",
 "education",
 "projects",
 "services",
 "testimonials",
 "certifications",
 "gallery",
 "contact",
 "custom"
]

const portfolioValidation = [
 body("user_id").isMongoId().withMessage("Invalid user id"),
 body("portfolio_name").trim().isLength({ min: 6 }).withMessage("Invalid portfolio name"),
 body("sections").isArray().withMessage("Sections should be array"),
 body("sections.*.type").isIn(sectionTypes).withMessage("Invalid section type"),
 body("sections.*.order").isInt({ gt: 0 }).withMessage("Invalid section order"),
 body("sections.*.visible").isBoolean().withMessage("Visible should be boolean"),
 body("sections.*.data").isObject().withMessage("Section data should be object"),
 body("theme").optional().isObject(),
 body("seo").optional().isObject()
]

const updateValidation = [
 body("portfolio_id").isMongoId().withMessage("Invalid portfolio id"),
 body("portfolio_name").optional().trim().isLength({ min: 6 }),
 body("sections").optional().isArray(),
 body("theme").optional().isObject(),
 body("is_private").optional().isBoolean()
]

const validate = (req, res, next) => {
 const errors = validationResult(req)
 if (!errors.isEmpty()) {
  return res.status(400).json({ status: false, errors: errors.array() })
 }
 next()
}

routes.post("/create", portfolioValidation, validate, portfolioController.create)
routes.post("/update", updateValidation, validate, portfolioController.update)
routes.post("/list", portfolioController.list)
routes.get("/details/:portfolio_id", portfolioController.details)
routes.get("/public/:slug", portfolioController.publicDetails)
routes.post("/publish", portfolioController.publish)
routes.delete("/remove/:portfolio_id", portfolioController.remove)

module.exports = routes