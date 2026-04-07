const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Allows us to parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Gym Database Connected!"))
  .catch(err => console.log(err));

app.get('/api/status', (req, res) => {
  res.json({ message: "Backend is connected and healthy! ⚡" });
});

// existing imports
const authRoutes = require('./routes/authRoutes');
const programRoutes = require('./routes/programRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const progressRoutes = require('./routes/progressRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));