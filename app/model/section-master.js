const mongoHelper = require("../helpers/mongo-helper")
const { getObjectId } = require("../utils/mongo-conn")

const COLLECTION = TBL_SECTION_MASTER

const buildWhere = (params = {}) => {
 const where = { status: 1 }

 if (params.section_id) where._id = getObjectId(params.section_id)
 if (params.type) where.type = params.type

 return where
}

exports.create = async (params = {}) => {
 const { name, type, description = "", icon = "", fields = [], settings = {} } = params

 if (!name) throw new Error("Section name required")
 if (!type) throw new Error("Section type required")

 const exists = await mongoHelper.getOne(COLLECTION, [{ $match: { type, status: 1 } }])

 if (Object.keys(exists).length) {
  throw new Error("Section already exists")
 }

 const document = {
  name,
  type,
  description,
  icon,
  fields,
  settings,
  status: 1,
  created_at: new Date(),
  updated_at: new Date()
 }

 return await mongoHelper.insertOne(COLLECTION, document)
}

exports.update = async (params = {}) => {
 const { section_id } = params
 if (!section_id) throw new Error("Section id required")

 const updateDoc = { updated_at: new Date() }

 const allowed = [
  "name",
  "description",
  "icon",
  "fields",
  "settings",
  "status"
 ]

 allowed.forEach(field => {
  if (field in params) {
   updateDoc[field] = params[field]
  }
 })

 return await mongoHelper.updateOne(COLLECTION, { _id: getObjectId(section_id) }, updateDoc)
}

exports.list = async (params = {}) => {
 const pipeline = [
  { $match: buildWhere(params) },
  { $sort: { created_at: -1 } },
  {
   $project: {
    name: 1,
    type: 1,
    description: 1,
    icon: 1,
    fields: 1,
    settings: 1
   }
  }
 ]

 return await mongoHelper.getDetails(COLLECTION, pipeline)
}

exports.details = async (params = {}) => {
 const pipeline = [{ $match: buildWhere(params) }]
 return await mongoHelper.getOne(COLLECTION, pipeline)
}

exports.remove = async (params = {}) => {
 const { section_id } = params
 if (!section_id) throw new Error("Section id required")

 return await mongoHelper.updateOne(
  COLLECTION,
  { _id: getObjectId(section_id) },
  { status: 0, updated_at: new Date() }
 )
}