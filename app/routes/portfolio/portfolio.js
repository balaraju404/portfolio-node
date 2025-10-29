const routes = require("express").Router()
const portfolioController = require("../../controller/portfolio/portfolio")

routes.post("/create", (req, res, next) => {
 portfolioController.create(req, res, next)
})

routes.post("/getAll", (req, res, next) => {
 portfolioController.details(req, res, next)
})

module.exports = routes