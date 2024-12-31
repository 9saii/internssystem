const express = require('express');
const router = express.Router();
const Internship = require('../models/internship');
const nodemailer = require('nodemailer'); // Import nodemailer
require('dotenv').config(); 

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail as the email service
  secure: true, //

  auth: {
    user: process.env.EMAIL_USER, // Replace with your Gmail email
    pass: process.env.EMAIL_PASS // Replace with your Gmail password or app-specific password
  }
});

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

// Update internship status (accept/reject) and send email
router.patch('/:id', async (req, res) => {
  const { status, message } = req.body;
  try {
    const updatedIntern = await Internship.findByIdAndUpdate(
      req.params.id, 
      { status, message }, 
      { new: true }
    );

    // Send email to the intern
    const mailOptions = {
      from: 'your-email@gmail.com', // Replace with your Gmail email
      to: updatedIntern.email, // Intern's email
      subject: 'Internship Application Status Update',
      text: `Your internship application has been ${status}. Message from admin: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).json(updatedIntern);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;