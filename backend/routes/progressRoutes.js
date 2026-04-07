const express = require('express');
const Progress = require('../models/Progress');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.post('/add', verifyToken, async (req, res) => {
  try {
    const progress = await Progress.create({ ...req.body, user: req.user._id });
    res.status(201).json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { user: req.user._id };
    const entries = await Progress.find(filter).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;