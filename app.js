require('dotenv').config(); // Load environment variables
require('./app/utils/config'); // Custom configurations
require('./app/utils/constants'); // Constants
const { mongoConnect } = require('./app/db-conn/db-conn'); // MongoDB connection function
const routes = require('./app/routes/index'); // Import routes
const express = require('express');
const cors = require('cors');
const http = require('http'); // Ensure http is required for the server

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

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

// Define the port
const PORT = process.env.PORT || 3000;

// Connect to the database
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
