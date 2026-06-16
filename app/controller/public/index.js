const publicModel = require("../../model/public")

exports.dashboard = async (req, res, next) => {
 try {
  const reqParams = req["body"] || {}
  const result = await publicModel.dashboard(reqParams)
  res.status(SUCCESS_CODE).json({ status: true, data: result })
 } catch (error) {
  next(error)
 }
}