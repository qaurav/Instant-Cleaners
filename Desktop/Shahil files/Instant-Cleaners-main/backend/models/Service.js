const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  // location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true }
});

module.exports = mongoose.model('Service', serviceSchema);
