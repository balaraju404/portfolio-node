const routes = require("express").Router()
const { check, validationResult } = require("express-validator")
const loginController = require("../../controller/login/login")

routes.post("/check", [
 check("login_name", "Invalid login name").trim().isString().isLength({ min: 1 }),
 check("password", "Invalid login password").trim().isString().isLength({ min: 1 })
], (req, res, next) => {
 const errors = validationResult(req)
 if (!errors.isEmpty()) return res.status(VALIDATION_ERROR_CODE).json({ status: false, errors: errors })
 loginController.loginCheck(req, res, next)
})

routes.post("/signup", [
 check("fname", "Invalid first name").trim().isString().isLength({ min: 3 }),
 check("lname", "Invalid last name").trim().isString().isLength({ min: 3 }),
 check("login_name", "Invalid login name").trim().isString().isLength({ min: 6 }),
 check("password", "Invalid login password").trim().isString().isLength({ min: 6 })
], (req, res, next) => {
 const errors = validationResult(req)
 if (!errors.isEmpty()) return res.status(VALIDATION_ERROR_CODE).json({ status: false, errors: errors })
 loginController.createUser(req, res, next)
})

module.exports = routes