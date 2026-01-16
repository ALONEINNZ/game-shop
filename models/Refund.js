const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  orderNumber: {
    type: String,
    required: true
  },
  ticketNumber: {
    type: String,
    unique: true
  },
  reason: {
    type: String,
    required: true,
    maxlength: 1000
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied', 'processed'],
    default: 'pending'
  },
  adminNotes: {
    type: String
  },
  refundAmount: {
    type: Number
  }
}, {
  timestamps: true
});

// Auto-generate ticket number
refundSchema.pre('save', function(next) {
  if (!this.ticketNumber) {
    this.ticketNumber = 'REF-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Refund', refundSchema);
