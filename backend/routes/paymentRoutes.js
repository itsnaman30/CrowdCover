const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.post('/create-checkout-session', verifyToken, async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: `Gym session ${sessionId}` },
          unit_amount: 1000,
        },
        quantity: 1,
      }],
      success_url: `${process.env.CLIENT_URL}/dashboard?paid=true`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard?paid=false`,
      metadata: { userId: req.user._id, sessionId }
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;