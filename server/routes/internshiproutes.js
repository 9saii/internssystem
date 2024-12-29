// backend/routes/internshipRoutes.js
const express = require('express');
const router = express.Router();
const Internship = require('../models/internship');

// Submit internship
router.post('/submit', async (req, res) => {
  const { internName, email } = req.body;
  const newIntern = new Internship({ internName, email });
  try {
    await newIntern.save();
    res.status(200).json(newIntern);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all internship requests
router.get('/', async (req, res) => {
  try {
    const internships = await Internship.find();
    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update internship status (accept/reject)
router.patch('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const updatedIntern = await Internship.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json(updatedIntern);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
