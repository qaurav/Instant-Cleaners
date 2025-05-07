const express = require('express');
const router = express.Router();

// POST /api/contact
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  // Here you can:
  // - Save the message to DB
  // - Send an email notification
  // For now, just respond success

  console.log('New contact message:', { name, email, message });

  res.status(200).json({ message: 'Message received successfully' });
});

module.exports = router;
