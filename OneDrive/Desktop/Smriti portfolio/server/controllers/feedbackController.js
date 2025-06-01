const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  const { rating, message } = req.body;

  if (!rating || !message) {
    return res.status(400).json({ error: 'Rating and message are required.' });
  }

  try {
    const feedback = new Feedback({ rating, message });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
