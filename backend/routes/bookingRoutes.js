const express = require('express');
const Booking = require('../models/Booking');
const Session = require('../models/session');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.post('/create', verifyToken, async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ error: 'Session not found' });
    if (session.attendees.length >= session.capacity) return res.status(409).json({ error: 'Session is full' });

    const existing = await Booking.findOne({ user: req.user._id, session: sessionId });
    if (existing) return res.status(409).json({ error: 'You already booked this session' });

    session.attendees.push(req.user._id);
    await session.save();

    const booking = await Booking.create({ user: req.user._id, session: sessionId, status: 'confirmed' });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { user: req.user._id };
    const bookings = await Booking.find(filter).populate('user', 'name email').populate('session');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    if (req.user.role !== 'admin' && booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    booking.status = req.body.status || booking.status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;