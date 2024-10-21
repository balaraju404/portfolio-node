// Load environment variables
require('dotenv').config();
require('./app/utils/config'); // Custom configurations
require('./app/utils/constants'); // Constants

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const http = require('http');
const multer = require('multer'); // Import multer for file uploads
const { mongoConnect } = require('./app/db-conn/db-conn'); // MongoDB connection function
const routes = require('./app/routes/index'); // Import routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Cloudinary upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
 const file = req.file;
 const formData = new FormData();
 formData.append('file', file.buffer.toString('base64'));

 try {
  const response = await axios.post(
   `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
   formData,
   {
    headers: {
     ...formData.getHeaders(),
    },
   }
  );
  res.status(200).json({ url: response.data.secure_url });
 } catch (error) {
  console.error(error);
  res.status(500).send('Upload failed');
 }
});

// Define allowed origins from config
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

// Set up CORS for the Express server
app.use(cors({
 origin: (origin, callback) => {
  if (allowedOrigins.includes(origin) || !origin) {
   callback(null, true);
  } else {
   callback(new Error('Not allowed by CORS'));
  }
 },
 methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
 allowedHeaders: ['Content-Type'],
}));

// Set up routes
app.use('/api', routes);

// Connect to the database and start the server
mongoConnect(() => {
 console.log('Database connected successfully.');

 // Simple route for testing
 app.get('/', (req, res) => {
  res.json({ message: 'Hello World', dbStatus: 'Connected' });
 });

 // Create server
 const appServer = http.createServer(app);

 // Start server
 appServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
 });
});

// Error handling middleware
app.use((err, req, res, next) => {
 console.error(err.stack);
 res.status(500).json({ error: 'Something went wrong!' });
});
