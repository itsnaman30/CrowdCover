const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Push Day"
  description: { type: String },           // e.g., "Chest, Shoulders, Triceps"
  duration: { type: Number },              // e.g., 60 (minutes)
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Program', programSchema);