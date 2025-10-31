const routes = require("express").Router()
const login = require("./login/login")
const user = require("./user/user")
const portfolio = require("./portfolio/portfolio")

routes.use("/login", login)
routes.use("/user", user)
routes.use("/portfolio", portfolio)

routes.get("/", (req, res, next) => {
 res.status(SUCCESS_CODE).json({ status: true, msg: "Server running" })
})

module.exports = routes