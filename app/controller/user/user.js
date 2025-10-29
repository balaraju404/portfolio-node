const userModel = require("../../model/user/user")

exports.updateUser = async (req, res, next) => {
 try {
  const reqParams = req.body || {}
  await userModel.updateUser(reqParams)
  res.status(SUCCESS_CODE).json({ status: true, msg: "User updated successfully." })
 } catch (error) {
  next(error)
 }
}