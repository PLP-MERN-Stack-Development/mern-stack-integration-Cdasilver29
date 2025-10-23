// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS — allow requests from your React app
app.use(
  cors({
    origin:  ['http://localhost:3000'], // React dev ports
    credentials: true,
  })
);

// Routes
try {
  app.use('/api/posts', require('./routes/posts'));
  app.use('/api/categories', require('./routes/categories'));
} catch (err) {
  console.warn('Routes not loaded yet, create routes/posts.js and routes/categories.js');
}

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Error handler middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
