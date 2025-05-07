const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Register admin (run once, then disable/remove in production)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    let admin = await Admin.findOne({ username });
    if (admin) return res.status(400).json({ message: 'Admin already exists' });
    admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json({ message: 'Admin registered' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login admin
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all admins
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find().select("-password"); // exclude password
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update admin
router.put("/:id", async (req, res) => {
  try {
    const { username, password } = req.body;
    const updateFields = {};
    if (username) updateFields.username = username;
    if (password) updateFields.password = password; // Make sure your Admin model hashes password on save
    const admin = await Admin.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Admin updated", admin: { _id: admin._id, username: admin.username } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete admin
router.delete("/:id", async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Admin deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
