const mongoHelper = require("../../helpers/mongo-helper")
const helper = require("../../helpers/helper")
const { getObjectId } = require("../../utils/mongo-conn")
const { DatabaseCollections } = require("../../utils/database-collections")

/**
 * Generate portfolio slug
 */
const generateSlug = (value = "") => {
 return String(value)
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
}



/**
 * Build Mongo where condition
 */
const buildWhere = (params = {}) => {
 const where = { status: 1 }

 if (params.user_id) where.user_id = getObjectId(params.user_id)
 if (params.portfolio_id) where._id = getObjectId(params.portfolio_id)
 if (params.slug) where.slug = params.slug
 if ("published" in params) where.published = Boolean(params.published)
 if ("is_private" in params) where.is_private = Boolean(params.is_private)

 return where
}

/**
 * CREATE PORTFOLIO
 */
exports.create = async (params = {}) => {
 try {
  const { user_id, portfolio_name, sections = [], theme = {}, seo = {}, social_links = [], profile = {} } = params

  if (!user_id) throw new Error("User id is required")
  if (!portfolio_name) throw new Error("Portfolio name is required")

  const available = await helper.checkPortfolioName(user_id, portfolio_name)
  if (!available) throw new Error("Portfolio name already exists")

  const doc = {
   user_id: getObjectId(user_id),
   portfolio_name: portfolio_name.trim(),
   slug: generateSlug(portfolio_name),
   profile,
   sections,
   theme,
   seo,
   social_links,
   is_private: false,
   published: false,
   status: 1,
   created_at: new Date(),
   updated_at: new Date()
  }
  return await mongoHelper.insertOne(DatabaseCollections.PORTFOLIOS, doc)
 } catch (error) {
  throw error
 }
}

/**
 * UPDATE PORTFOLIO
 */
exports.update = async (params = {}) => {
 try {
  const { portfolio_id, user_id, portfolio_name } = params
  if (!portfolio_id) throw new Error("Portfolio id is required")

  const where = {
   _id: getObjectId(portfolio_id),
   status: 1
  }

  if (user_id) where.user_id = getObjectId(user_id)

  const update = { updated_at: new Date() }

  if (portfolio_name) {
   const available = await helper.checkPortfolioName(user_id, portfolio_name, portfolio_id)
   if (!available) throw new Error("Portfolio name already exists")

   update.portfolio_name = portfolio_name.trim()
   update.slug = generateSlug(portfolio_name)
  }

  const allowedFields = [
   "profile",
   "sections",
   "theme",
   "seo",
   "social_links",
   "is_private",
   "published"
  ]

  allowedFields.forEach(field => {
   if (field in params) {
    update[field] = params[field]
   }
  })

  return await mongoHelper.updateOne(DatabaseCollections.PORTFOLIOS, where, update,)
 } catch (error) {
  throw error
 }
}

/**
 * LIST PORTFOLIOS
 */
exports.list = async (params = {}) => {

 try {
  const page = Number(params.page || 1)
  const limit = Number(params.limit || 20)
  const skip = (page - 1) * limit

  const pipeline = [
   { $match: buildWhere(params) },
   { $sort: { created_at: -1 } },
   { $skip: skip },
   { $limit: limit },
   {
    $project: {
     portfolio_name: 1,
     slug: 1,
     published: 1,
     is_private: 1,
     theme: 1,
     profile: {
      name: "$profile.name",
      headline: "$profile.headline",
      avatar: "$profile.avatar"
     },
     sections_count: { $size: { $ifNull: ["$sections", []] } },
     created_at: 1
    }
   }
  ]

  return await mongoHelper.getDetails(DatabaseCollections.PORTFOLIOS, pipeline)
 } catch (error) {
  throw error
 }
}

/**
 * GET PORTFOLIO DETAILS
 */
exports.details = async (params = {}) => {
 try {
  const pipeline = [{ $match: buildWhere(params) }]
  return await mongoHelper.getDetails(DatabaseCollections.PORTFOLIOS, pipeline)
 } catch (error) {
  throw error
 }
}

/**
 * PUBLIC PORTFOLIO VIEW
 */
exports.publicDetails = async (params = {}) => {
 try {
  const pipeline = [
   {
    $match: {
     slug: params.slug,
     published: true,
     status: 1
    }
   },
   {
    $project: {
     _id: 0,
     portfolio_name: 1,
     profile: 1,
     sections: 1,
     theme: 1,
     seo: 1,
     social_links: 1
    }
   }
  ]

  return await mongoHelper.getDetails(DatabaseCollections.PORTFOLIOS, pipeline)
 } catch (error) {
  throw error
 }
}

/**
 * PUBLISH PORTFOLIO
 */
exports.publish = async (params = {}) => {
 try {

  if (!params.portfolio_id) throw new Error("Portfolio id required")

  return await mongoHelper.updateOne(
   DatabaseCollections.PORTFOLIOS,
   { _id: getObjectId(params.portfolio_id), status: 1 },
   { published: Boolean(params.published), updated_at: new Date() }
  )
 } catch (error) {
  throw error
 }
}

/**
 * REMOVE PORTFOLIO
 * Soft Delete
 */
exports.remove = async (params = {}) => {
 try {

  if (!params.portfolio_id) throw new Error("Portfolio id required")

  return await mongoHelper.updateOne(
   DatabaseCollections.PORTFOLIOS,
   { _id: getObjectId(params.portfolio_id), status: 1 },
   { status: 0, updated_at: new Date() }
  )
 } catch (error) {
  throw error
 }
}