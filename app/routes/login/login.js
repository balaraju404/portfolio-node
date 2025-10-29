const routes = require("express").Router()
const { check, validationResult } = require("express-validator")
const loginController = require("../../controller/login/login")

routes.post("/check", [
 check("login_name", "Invalid login name").trim().isString().isLength({ min: 1 }),
 check("password", "Invalid login password").trim().isString().isLength({ min: 1 })
], (req, res, next) => {
 const errors = validationResult.errors()
 if (errors) throw errors
 loginController.loginCheck(req, res, next)
})

routes.post("/create_user", [
 check("fname", "Invalid first name").trim().isString().isLength({ min: 3 }),
 check("lname", "Invalid last name").trim().isString().isLength({ min: 3 }),
 check("login_name", "Invalid login name").trim().isString().isLength({ min: 6 }),
 check("password", "Invalid login password").trim().isString().isLength({ min: 6 })
], (req, res, next) => {
 const errors = validationResult.errors()
 if (errors) throw errors
 loginController.createUser(req, res, next)
})

module.exports = routes