const routes = require("express").Router()
const { body, validationResult } = require("express-validator")
const controller = require("../controller/section-master")

const validateRequest = (req, res, next) => {
 const errors = validationResult(req)
 if (!errors.isEmpty()) {
  return res.status(400).json({ status: false, errors: errors.array() })
 }
 next()
}

const createValidation = [
 body("name").trim().notEmpty().withMessage("Section name required"),
 body("type").trim().notEmpty().withMessage("Section type required"),
 body("fields").isArray().withMessage("Fields must be array")
]

const updateValidation = [
 body("section_id").isMongoId().withMessage("Invalid section id")
]

/*
 Admin APIs
*/
routes.post("/create", createValidation, validateRequest, controller.create)
routes.post("/update", updateValidation, validateRequest, controller.update)
routes.delete("/remove/:section_id", controller.remove)

/*
 User APIs
*/
routes.post("/list", controller.list)
routes.get("/details/:section_id", controller.details)

module.exports = routes