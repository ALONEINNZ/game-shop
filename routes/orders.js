const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { gameIds, amount, items } = req.body;
    
    // Use amount from frontend (in dollars), convert to cents
    const totalAmount = amount || 0;
    
    if (totalAmount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'nzd', // NZ dollars
      metadata: {
        userId: req.userId,
        items: items ? JSON.stringify(items.slice(0, 5)) : '' // Store item info
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: totalAmount
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ message: error.message });
  }
});


router.post('/confirm-purchase', auth, async (req, res) => {
  try {
    const { paymentIntentId, items, amount } = req.body;
    
    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    // Create order record
    const order = new Order({
      user: req.userId,
      items: items || [],
      totalAmount: amount || paymentIntent.amount / 100,
      paymentStatus: 'completed',
      paymentId: paymentIntentId
    });

    await order.save();

    res.json({
      message: 'Purchase completed successfully',
      order: order
    });
  } catch (error) {
    console.error('Confirm purchase error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;