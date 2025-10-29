const mongoose = require("mongoose");

const connUrl = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
let mongoConn;

async function connectDB() {
 if (mongoConn) return mongoConn;
 mongoConn = mongoose.createConnection(connUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 60000,
 });

 return new Promise((resolve, reject) => {
  mongoConn.once("open", () => {
   console.log(MONGO_DB_NAME + " connected successfully");
   resolve(mongoConn);
  });
  mongoConn.on("error", (err) => {
   console.error("MongoDB connection error:", err);
   reject(err);
  });
 });
}

// Utility to get a valid MongoDB ObjectId
function getObjectId(id) {
 try {
  return new mongoose.Types.ObjectId(id);
 } catch (err) {
  console.error("Invalid ObjectId:", id);
  return null;
 }
}

module.exports = { connectDB, getObjectId };