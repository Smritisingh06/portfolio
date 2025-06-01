const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  rating: {
    type: String,
    required: true,
    enum: ['bad', 'good', 'very_good', 'excellent'],
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
