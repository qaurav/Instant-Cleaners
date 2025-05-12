const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  address: { type: String },
  bookingDate: { type: Date, required: true },
  message: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
