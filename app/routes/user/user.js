const routes = require("express").Router()
const { check, validationResult } = require("express-validator")
const userController = require("../../controller/user/user")

routes.post("/update", [
 check("user_id", "Invalid user id").isMongoId(),
 check("fname", "Invalid first name").optional().trim().isString().isLength({ min: 3 }),
 check("lname", "Invalid last name").optional().trim().isString().isLength({ min: 3 }),
 check("login_name", "Invalid login name").optional().trim().isString().isLength({ min: 6 }),
 check("password", "Invalid login password").optional().trim().isString().isLength({ min: 6 })
], (req, res, next) => {
 const errors = validationResult(req)
 if (!errors.isEmpty()) return res.status(VALIDATION_ERROR_CODE).json({ status: false, errors: errors })
 userController.updateUser(req, res, next)
})

module.exports = routes