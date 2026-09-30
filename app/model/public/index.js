const mongoHelper = require("../../helpers/mongo-helper")
const { DatabaseCollections } = require("../../utils/database-collections")

exports.dashboard = async (reqParams) => {
 try {
  const pipeline = [{ $count: "portfolios_created" }]
  const result = await mongoHelper.getDetails(DatabaseCollections.PORTFOLIOS, pipeline)

  return {
   portfolios_created: result?.[0]?.portfolios_created || 0,
   portfolio_sections: 5,
   portfolio_templates: 1
  }
 } catch (error) {
  throw error
 }
}