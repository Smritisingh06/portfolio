// contactRoutes.js
const express = require('express');
const { submitContactForm } = require('../controllers/authController');

const router = express.Router();

router.post('/submitContactForm', submitContactForm);

module.exports = router;

// // In server.js
// const contactRoutes = require('./routes/contactRoutes');

// app.use('/api/contact', contactRoutes);
