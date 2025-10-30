const portfolioModel = require("../../model/portfolio/portfolio")

exports.create = async (req, res, next) => {
 try {
  const reqParams = req["body"] || {}
  const result = await portfolioModel.create(reqParams)
  res.status(SUCCESS_CODE).json({ status: true, msg: "Portfolio created successfully", id: result["insertedId"] })
 } catch (error) {
  next(error)
 }
}
exports.details = async (req, res, next) => {
 try {
  const reqParams = req["body"] || {}
  const result = await portfolioModel.details(reqParams)
  res.status(SUCCESS_CODE).json({ status: true, data: result["data"] })
 } catch (error) {
  next(error)
 }
}