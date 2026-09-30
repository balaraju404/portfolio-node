const mongoHelper = require("./mongo-helper")
const { getObjectId } = require("../utils/mongo-conn")

exports.checkLoginName = async (loginname) => {
 try {
  const result = await mongoHelper.getOne(TBL_USERS, [{ $match: { login_name: loginname } }])
  return Object.keys(result).length == 0
 } catch (error) {
  throw error
 }
}

exports.checkPortfolioName = async (user_id, portfolio_name, excludePortfolioId = null) => {
 try {
  const trimmedName = String(portfolio_name || "").trim()
  if (!trimmedName) return false

  const matchQuery = { portfolio_name: trimmedName }
  if (user_id) matchQuery.user_id = getObjectId(user_id)
  if (excludePortfolioId) matchQuery._id = { $ne: getObjectId(excludePortfolioId) }

  const result = await mongoHelper.getOne(TBL_PORTFOLIOS, [{ $match: matchQuery }])
  return Object.keys(result).length == 0
 } catch (error) {
  throw error
 }
}