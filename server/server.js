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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (wrap in try-catch in case files don’t exist yet)
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

// Port setup
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;