const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  trainer: String,
  duration: Number, // in minutes
  intensity: { type: String, enum: ['Low', 'Medium', 'High'] },
  price: Number,
  startTime: { type: Date, default: Date.now },
  capacity: { type: Number, default: 20 },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', SessionSchema);