const mongoHelper = require("../../helpers/mongo-helper")
const helper = require("../../helpers/helper")
const { getObjectId } = require("../../utils/mongo-conn")

const buildWhere = (params = {}) => {
 const whr = { status: 1 }
 const normalized = params || {}

 if (normalized.user_id) whr.user_id = getObjectId(normalized.user_id)
 if (normalized.portfolio_id) whr._id = getObjectId(normalized.portfolio_id)
 if (normalized.portfolio_name) whr.portfolio_name = normalized.portfolio_name

 if ("is_private" in normalized) whr.is_private = Number(normalized.is_private)
 if ("status" in normalized) whr.status = Number(normalized.status)

 return whr
}

exports.create = async (reqParams = {}) => {
 try {
  const { user_id, portfolio_name, user_info } = reqParams
  const cleanPortfolioName = String(portfolio_name || "").trim()

  if (!user_id) throw new Error("User id is required")
  if (!cleanPortfolioName) throw new Error("Portfolio name is required")

  const isAvailable = await helper.checkPortfolioName(user_id, cleanPortfolioName)
  if (!isAvailable) throw new Error("Portfolio name already exists")

  const insertDoc = {
   user_id: getObjectId(user_id),
   portfolio_name: cleanPortfolioName,
   user_info,
   is_private: 0,
   status: 1,
   created_at: new Date()
  }

  ["services", "projects", "skills", "contact_info"].forEach((field) => {
   if (field in reqParams) {
    insertDoc[field] = reqParams[field]
   }
  })

  return await mongoHelper.insertOne(TBL_PORTFOLIOS, insertDoc)
 } catch (error) {
  throw error
 }
}

exports.update = async (reqParams = {}) => {
 try {
  const { portfolio_id, user_id, portfolio_name, ...rest } = reqParams
  const targetId = portfolio_id || reqParams._id

  if (!targetId) throw new Error("Portfolio id is required")

  const updateDoc = { updated_at: new Date() }
  const where = { _id: getObjectId(targetId), status: 1 }

  if (user_id) where.user_id = getObjectId(user_id)

  if (portfolio_name) {
   const cleanPortfolioName = String(portfolio_name).trim()
   const isAvailable = await helper.checkPortfolioName(user_id || where.user_id, cleanPortfolioName, targetId)
   if (!isAvailable) throw new Error("Portfolio name already exists")
   updateDoc.portfolio_name = cleanPortfolioName
  }

  if ("user_info" in reqParams) updateDoc.user_info = reqParams.user_info
  if ("is_private" in reqParams) updateDoc.is_private = Number(reqParams.is_private)
  if ("status" in reqParams) updateDoc.status = Number(reqParams.status)

  ["services", "projects", "skills", "contact_info"].forEach((field) => {
   if (field in rest) {
    updateDoc[field] = rest[field]
   }
  })

  return await mongoHelper.updateOne(TBL_PORTFOLIOS, where, updateDoc, true)
 } catch (error) {
  throw error
 }
}

exports.remove = async (reqParams = {}) => {
 try {
  const { portfolio_id, user_id } = reqParams
  const where = { _id: getObjectId(portfolio_id || reqParams._id), status: 1 }

  if (!where._id) throw new Error("Portfolio id is required")
  if (user_id) where.user_id = getObjectId(user_id)

  return await mongoHelper.updateOne(TBL_PORTFOLIOS, where, { status: 0, updated_at: new Date() }, true)
 } catch (error) {
  throw error
 }
}

exports.list = async (reqParams = {}) => {
 try {
  const pipeline = [
   {
    $match: buildWhere(reqParams)
   },
   {
    $project: {
     _id: 1,
     portfolio_name: 1,
     user_info: {
      name: "$user_info.name",
      role: "$user_info.role",
      img: "$user_info.img",
      about: { $substrCP: [{ $ifNull: ["$user_info.about", ""] }, 0, 100] }
     },
     contact_info: { address: "$contact_info.address" },
     projects_count: { $size: { $ifNull: ["$projects", []] } },
     services_count: { $size: { $ifNull: ["$services", []] } },

     skills: {
      $slice: [
       {
        $reduce: {
         input: {
          $map: {
           input: { $ifNull: ["$projects", []] },
           as: "project",
           in: { $ifNull: ["$$project.tech_stack.skills", []] }
          }
         },
         initialValue: [],
         in: { $setUnion: ["$$value", "$$this"] }
        }
       },
       5
      ]
     }
    }
   }
  ]

  return await mongoHelper.getDetails(TBL_PORTFOLIOS, pipeline)
 } catch (error) {
  throw error
 }
}

exports.details = async (reqParams = {}) => {
 try {
  const pipeline = [{ $match: buildWhere(reqParams) }]
  return await mongoHelper.getDetails(TBL_PORTFOLIOS, pipeline)
 } catch (error) {
  throw error
 }
}