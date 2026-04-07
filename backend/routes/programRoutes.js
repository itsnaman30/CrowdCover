const express = require('express');
const router = express.Router();
const Program = require('../models/Program');

// POST: Add a new program
router.post('/add', async (req, res) => {
  try {
    const newProgram = new Program(req.body);
    const savedProgram = await newProgram.save();
    res.status(201).json(savedProgram);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Fetch all programs
router.get('/', async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Fetch program by id
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ error: 'Program not found' });
    res.json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Update a program
router.put('/:id', async (req, res) => {
  try {
    const updated = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Program not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Delete a program
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Program.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Program not found' });
    res.json({ message: 'Program deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;