const express = require('express');
const Refund = require('../models/Refund');
const Order = require('../models/Order');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { sendRefundRequestEmail } = require('../utils/emailService');

const router = express.Router();

// Submit refund request
router.post('/request', auth, async (req, res) => {
  try {
    const { orderNumber, reason } = req.body;
    
    if (!orderNumber || !reason) {
      return res.status(400).json({ message: 'Order number and reason are required' });
    }
    
    // Find the order
    const order = await Order.findOne({ orderNumber, user: req.userId });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found or does not belong to you' });
    }
    
    // Check if refund already exists for this order
    const existingRefund = await Refund.findOne({ order: order._id });
    if (existingRefund) {
      return res.status(400).json({ 
        message: 'A refund request already exists for this order',
        ticketNumber: existingRefund.ticketNumber
      });
    }
    
    // Check if order is within refund window (14 days)
    const daysSincePurchase = (Date.now() - order.createdAt) / (1000 * 60 * 60 * 24);
    if (daysSincePurchase > 14) {
      return res.status(400).json({ message: 'Refund window has expired (14 days)' });
    }
    
    // Create refund request
    const refund = new Refund({
      user: req.userId,
      order: order._id,
      orderNumber: order.orderNumber,
      reason: reason,
      refundAmount: order.totalAmount
    });
    
    await refund.save();
    
    // Get user for email
    const user = await User.findById(req.userId);
    
    // Send confirmation email
    if (user && user.email) {
      await sendRefundRequestEmail(user.email, user.username, {
        ticketNumber: refund.ticketNumber,
        orderNumber: order.orderNumber,
        reason: reason
      });
    }
    
    res.json({
      message: 'Refund request submitted successfully',
      ticketNumber: refund.ticketNumber
    });
  } catch (error) {
    console.error('Refund request error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get user's refund requests
router.get('/my-requests', auth, async (req, res) => {
  try {
    const refunds = await Refund.find({ user: req.userId })
      .populate('order')
      .sort({ createdAt: -1 });
    
    res.json(refunds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's orders (for refund form dropdown)
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ 
      user: req.userId,
      paymentStatus: 'completed'
    }).sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get all refund requests
router.get('/admin/all', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const refunds = await Refund.find()
      .populate('user', 'username email')
      .populate('order')
      .sort({ createdAt: -1 });
    
    res.json(refunds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Update refund status
router.put('/admin/:ticketNumber', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const { status, adminNotes } = req.body;
    
    const refund = await Refund.findOneAndUpdate(
      { ticketNumber: req.params.ticketNumber },
      { status, adminNotes },
      { new: true }
    );
    
    if (!refund) {
      return res.status(404).json({ message: 'Refund request not found' });
    }
    
    // If approved, update order status
    if (status === 'approved' || status === 'processed') {
      await Order.findByIdAndUpdate(refund.order, { paymentStatus: 'refunded' });
    }
    
    res.json({ message: 'Refund status updated', refund });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
