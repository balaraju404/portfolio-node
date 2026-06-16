const mongoHelper = require("../../helpers/mongo-helper")
const helper = require("../../helpers/helper")
const { getObjectId } = require("../../utils/mongo-conn")

const buildWhere = (params = {}) => {
 const whr = { status: 1 }

 if (params.user_id) whr.user_id = getObjectId(params.user_id)
 if (params.portfolio_id) whr._id = getObjectId(params.portfolio_id)
 if (params.portfolio_name) whr.portfolio_name = params.portfolio_name

 if ("is_private" in params) whr.is_private = params.is_private
 if ("status" in params) whr.status = params.status

 return whr
}

exports.create = async (reqParams) => {
 try {
  const { user_id, portfolio_name, user_info } = reqParams

  const isAvailable = await helper.checkPortfolioName(portfolio_name)
  if (!isAvailable) throw new Error("Portfolio name already exists")

  const insertDoc = {
   user_id: getObjectId(user_id),
   portfolio_name,
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

exports.list = async (reqParams) => {
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

exports.details = async (reqParams) => {
 try {
  const pipeline = [{ $match: buildWhere(reqParams) }]
  return await mongoHelper.getDetails(TBL_PORTFOLIOS, pipeline)
 } catch (error) {
  throw error
 }
}