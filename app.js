// Environment
require("dotenv").config()

// App config and constants
require("./app/utils/config")
require("./app/utils/constants")

// Dependencies
const express = require("express")
const cors = require("cors")
const { connectDB } = require("./app/utils/mongo-conn")

// Create Express app
const app = express()

// Middleware
app.use(express.json())

// CORS configuration
const allowedOrigins = (ALLOWED_ORIGINS || "").split(",").filter(Boolean)
app.use(cors({
 origin: (origin, callback) => {
  if (allowedOrigins.includes(origin) || !origin) callback(null, true)
  else callback(new Error("Not allowed by CORS"))
 }
}))

// Routes
const routes = require("./app/routes")
app.use("/", routes)

 // Start server and connect to DB
 (async () => {
  try {
   await connectDB()
   app.listen(PORT, (err) => {
    if (err) console.log("Error on creating server")
    console.log("Server running on " + PORT)
   })
  } catch (err) {
   console.error("Failed to connect to DB", err)
   process.exit(1)
  }
 })()
