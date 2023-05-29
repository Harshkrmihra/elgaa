const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a title for the service'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the service'],
  },
  duration: {
    type: Number,
    required: [true, 'Please provide the duration for the service in minutes'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide the price for the service'],
  },
});

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;
