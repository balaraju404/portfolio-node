const mongoHelper = require("../../helpers/mongo-helper")
const helper = require("../../helpers/helper")
const { getObjectId } = require("../../utils/mongo-conn")

exports.create = async (reqParams) => {
 try {
  const { user_id, portfolio_name, user_info } = reqParams
  if (!helper.checkPortfolioName(portfolio_name)) throw Error("Portfolio name already exists")

  const insertDoc = {
   user_id: user_id,
   portfolio_name: portfolio_name,
   user_info: user_info,
   is_private: 0,
   status: 1,
   created_at: new Date()
  }

  if ("services" in reqParams) insertDoc["services"] = reqParams["services"]
  if ("projects" in reqParams) insertDoc["projects"] = reqParams["projects"]
  if ("skills" in reqParams) insertDoc["skills"] = reqParams["skills"]
  if ("contact_info" in reqParams) insertDoc["contact_info"] = reqParams["contact_info"]

  const result = await mongoHelper.insertOne(TBL_PORTFOLIOS, insertDoc)
  return result
 } catch (error) {
  throw error
 }
}

exports.details = async (reqParams) => {
 try {
  const whr = { status: 1 }

  if ("user_id" in reqParams) whr["user_id"] = getObjectId(reqParams["user_id"])
  if ("portfolio_id" in reqParams) whr["_id"] = getObjectId(reqParams["portfolio_id"])
  if ("portfolio_name" in reqParams) whr["portfolio_name"] = reqParams["portfolio_name"]
  if ("is_private" in reqParams) whr["is_private"] = reqParams["is_private"]
  if ("status" in reqParams) whr["status"] = reqParams["status"]

  const pipeline = [
   { $match: whr }
  ]

  const result = await mongoHelper.getDetails(TBL_PORTFOLIOS, pipeline)
  return result
 } catch (error) {
  throw error
 }
}