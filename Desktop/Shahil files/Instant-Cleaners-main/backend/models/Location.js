const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  image: String,
  description: String
});

module.exports = mongoose.model('Location', locationSchema);
