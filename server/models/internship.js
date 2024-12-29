// backend/models/internship.js
const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  internName: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: 'pending' }, // Default status
});

module.exports = mongoose.model('Internship', internshipSchema);
