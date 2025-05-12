const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const authMiddleware = require('../middleware/authMiddleware');

// Create location (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all locations (public)
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find().populate('services');
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get location by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate('services');
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update location (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json(location);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete location (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json({ message: 'Location deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
