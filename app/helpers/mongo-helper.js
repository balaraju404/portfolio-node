const { connectDB } = require("../utils/mongo-conn")

exports.getDetails = async (collection, pipeline) => {
 const conn = await connectDB()
 return await conn.collection(collection).aggregate(pipeline).toArray()
}

exports.getOne = async (collection, pipeline) => {
 const conn = await connectDB()
 pipeline.push({ $limit: 1 })
 const result = await conn.collection(collection).aggregate(pipeline).toArray()
 return result?.[0] || {}
}

exports.insertOne = async (collection, data) => {
 const conn = await connectDB()
 return await conn.collection(collection).insertOne(data)
}

exports.insertMany = async (collection, dataArray) => {
 const conn = await connectDB()
 return await conn.collection(collection).insertMany(dataArray)
}

exports.updateOne = async (collection, filter, updateDoc, isSet = 1) => {
 const conn = await connectDB()
 const obj = isSet == 1 ? { $set: updateDoc } : updateDoc
 return await conn.collection(collection).updateOne(filter, obj)
}

exports.updateMany = async (collection, filter, updateDoc, isSet = 1) => {
 const conn = await connectDB()
 const obj = isSet == 1 ? { $set: updateDoc } : updateDoc
 return await conn.collection(collection).updateMany(filter, obj)
}

exports.deleteOne = async (collection, filter) => {
 const conn = await connectDB()
 return await conn.collection(collection).deleteOne(filter)
}

exports.deleteMany = async (collection, filter) => {
 const conn = await connectDB()
 return await conn.collection(collection).deleteMany(filter)
}