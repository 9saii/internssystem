require('dotenv').config();  // Load environment variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { authMiddleware, adminMiddleware } = require('./middleware/authmiddleware');
const app = express();

// Middleware Setup
app.use(cors());  // Enable CORS for all routes (should be placed before routes)
app.use(express.json());  // Parse incoming JSON requests

// Use routes
app.use('/api/admin', authMiddleware, adminMiddleware, require('./routes/authroutes'));
app.use('/api/internships', require('./routes/internshiproutes'));

// Database Connection (Using environment variables)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Server Setup
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
