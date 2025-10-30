const mongoHelper = require("../../helpers/mongo-helper")
const pwdHashHelper = require("../../helpers/pwd-hashing")
const helper = require("../../helpers/helper")

exports.loginCheck = async (reqParams) => {
 try {
  const { login_name, password } = reqParams

  const pipeline = [
   { $match: { login_name: login_name } },
   { $addFields: { user_id: "$_id" } },
   { $project: { _id: 0 } }
  ]
  const result = await mongoHelper.getOne(TBL_USERS, pipeline)

  if (Object.keys(result).length == 0) throw Error("Invalid loginname")
  const checkPwd = await pwdHashHelper.checkPassword(password, result["password"])
  if (!checkPwd) throw Error("Invalid password")
  delete result["password"]
  return result
 } catch (error) {
  throw error
 }
}

exports.createUser = async (reqParams) => {
 try {
  const { fname, lname, login_name, password } = reqParams

  const checkLoginName = await helper.checkLoginName(login_name)
  if (!checkLoginName) throw Error("Login name already exists")

  const hashPwd = await pwdHashHelper.hashPassword(password)

  const insertObj = {
   fname: fname,
   lname: lname,
   login_name: login_name,
   password: hashPwd,
   is_admin: 0,
   created_at: new Date()
  }
  const result = await mongoHelper.insertOne(TBL_USERS, insertObj)
  return result
 } catch (error) {
  throw error
 }
}