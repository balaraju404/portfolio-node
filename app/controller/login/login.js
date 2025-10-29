const loginModel = require("../../model/login/login")

exports.loginCheck = async (req, res, next) => {
 try {
  const reqParams = req.body || {}
  const result = await loginModel.loginCheck(reqParams)
  res.status(SUCCESS_CODE).json({ status: true, msg: "Login Successfull", data: result })
 } catch (error) {
  next(error)
 }
}

exports.createUser = async (req, res, next) => {
 try {
  const reqParams = req.body || {}
  const result = await loginModel.createUser(reqParams)
  res.status(SUCCESS_CODE).json({ status: true, msg: "User Created Successfully" })
 } catch (error) {
  next(error)
 }
}