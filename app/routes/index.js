const routes = require("express").Router()
const login = require("./login/login")
const user = require("./user/user")
const sectionMaster = require("./section-master")
const portfolio = require("./portfolio/portfolio")
const public = require("./public")

routes.use("/login", login)
routes.use("/user", user)
routes.use("/section_master", sectionMaster)
routes.use("/portfolio", portfolio)
routes.use("/public", public)

routes.get("/", (req, res, next) => {
 res.status(SUCCESS_CODE).json({ status: true, msg: "Server running" })
})

module.exports = routes