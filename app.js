// Environment
require("dotenv").config()

// App config and constants
require("./app/utils/config")
require("./app/utils/constants")

// Dependencies
const express = require("express")
const cors = require("cors")
const { connectDB } = require("./app/utils/mongo-conn")
const { errorHandler } = require("./app/helpers/errorHandler")

// Create Express app
const app = express()

// Middleware
app.use(express.json())

// CORS configuration
const allowedOrigins = (ALLOWED_ORIGINS || "").split(",")
app.use(cors({
 origin: (origin, callback) => {
  if (allowedOrigins.includes(origin) || !origin) callback(null, true)
  else callback(new Error("Not allowed by CORS"))
 }
}))

// Routes
const routes = require("./app/routes")
app.use("/", routes)
app.use(errorHandler)

app.listen(PORT, async (err) => {
 await connectDB()
 if (err) console.log("Error on creating server")
 console.log("Server running on " + PORT)
})