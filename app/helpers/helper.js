const mongoHelper = require("./mongo-helper")

exports.checkLoginName = async (loginname) => {
 try {
  const result = await mongoHelper.getOne(TBL_USERS, [{ $match: { login_name: loginname } }])
  return Object.keys(result).length == 0
 } catch (error) {
  throw error
 }
}