const mongoHelper = require("../../helpers/mongo-helper")
const { DatabaseCollections } = require("../../utils/database-collections")
const { getObjectId } = require("../../utils/mongo-conn")

exports.updateUser = async (reqParams) => {
 try {
  const updateObj = { updated_at: new Date() }
  if ("fname" in reqParams) updateObj["fname"] = reqParams["fname"]
  if ("lname" in reqParams) updateObj["lname"] = reqParams["lname"]
  if ("password" in reqParams) updateObj["password"] = pwdHashHelper.hashPassword(reqParams["password"])

  const whr = { _id: getObjectId(reqParams["user_id"]) }
  const result = await mongoHelper.updateOne(DatabaseCollections.USERS, updateObj, whr)
  return result
 } catch (error) {
  throw error
 }
}