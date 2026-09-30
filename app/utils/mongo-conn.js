const mongoose = require("mongoose")

const buildMongoUrl = () => {
 const username = encodeURIComponent(MONGO_DB_USERNAME || "")
 const password = encodeURIComponent(MONGO_DB_PASSWORD || "")
 const host = MONGO_DB_HOST || ""
 const name = MONGO_DB_NAME || "portfolio"

 if (!host) {
  throw new Error("MongoDB host is not configured. Set MONGO_DB_HOST in your environment.")
 }

 return `mongodb+srv://${username}:${password}@${host}/${name}?retryWrites=true&w=majority`
}

let mongoConn

async function connectDB() {
 if (mongoConn) return mongoConn

 try {
  const connUrl = buildMongoUrl()
  console.log(connUrl);
  
  mongoConn = mongoose.createConnection(connUrl, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   connectTimeoutMS: 60000,
  })

  return new Promise((resolve, reject) => {
   mongoConn.once("open", () => {
    console.log(MONGO_DB_NAME + " connected successfully")
    resolve(mongoConn)
   })
   mongoConn.on("error", (err) => {
    console.error("MongoDB connection error:", err)
    reject(err)
   })
  })
 } catch (error) {
  console.error(error.message)
  throw error
 }
}

// Utility to get a valid MongoDB ObjectId
function getObjectId(id) {
 try {
  return new mongoose.Types.ObjectId(id)
 } catch (err) {
  console.error("Invalid ObjectId:", id)
  return null
 }
}

module.exports = { connectDB, getObjectId }