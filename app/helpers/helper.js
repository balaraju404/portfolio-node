const mongoHelper = require("./mongo-helper")

exports.checkLoginName = async (loginname) => {
 try {
  const result = await mongoHelper.getOne(TBL_USERS, [{ $match: { login_name: loginname } }])
  return Object.keys(result).length == 0
 } catch (error) {
  throw error
 }
}

exports.checkPortfolioName = async (portfolio_name) => {
 try {
  const result = await mongoHelper.getOne(TBL_PORTFOLIOS, [{ $match: { portfolio_name: portfolio_name } }])
  return Object.keys(result).length == 0
 } catch (error) {
  throw error
 }
}