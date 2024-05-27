const mongoose = require('mongoose');

const ShipperSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    uid: {
      type: String,
      required: [true, 'Please provide a uid'],
      unique: true,
    },
    motorcycleNumber: {
      type: String,
      required: [true, 'Please provide a motorcycle number'],
    },
    suspended: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Shipper', ShipperSchema);
