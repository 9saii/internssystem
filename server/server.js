const express = require('express');
const cors = require('cors');  // Import the cors module
const mongoose = require('mongoose');
const app = express();

// Enable CORS for all routes
app.use(cors());  // This will allow all origins, including 'http://localhost:5173'

// Other middleware
app.use(express.json());
mongoose.connect('mongodb+srv://surugowtham27:6281957827@cluster0.wucyb.mongodb.net/backend')
.then(() => {
  console.log("MongoDb connected")
})
.catch((err) => {
  console.error("Error connecting to MongoDB", err)
})

// Your routes (as before)
app.use('/api/internships', require('./routes/internshiproutes'));

// Set up the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
