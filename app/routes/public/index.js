const routes = require("express").Router()
const { body, validationResult } = require("express-validator")
const publicController = require("../../controller/public")

routes.post("/dashboard", [], (req, res, next) => {
 publicController.dashboard(req, res, next)
})

module.exports = routes