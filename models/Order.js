const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: [true, 'Please provide an order number'],
    },
    shipper: {
      type: mongoose.Schema.ObjectId,
      ref: 'Shipper',
      required: [true, 'Please provide a shipper'],
    },
    total: {
      type: Number,
      required: [true, 'Please provide a total amount'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
