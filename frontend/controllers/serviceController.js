const asyncHandler = require('../middlewares/asyncHandler');
const Service = require('../models/Service');
const Coach = require('../models/Coach');
const mongoose = require('mongoose');

// Create a new service for a coach
exports.createService = asyncHandler(async (req, res) => {
  const { title, description, duration, price } = req.body;
  const coachId = req.params.coachId;
  const coach = await Coach.findById(coachId);

  // Check if the coach exists
  if (!coach) {
    return res.status(404).json({ msg: 'Coach not found' });
  }

  // Check if the authenticated user is the coach or an admin
  if (req.user.id !== coach.user.toString() && req.user.type !== 'Admin') {
    return res.status(401).json({ msg: 'Not authorized to create this service' });
  }
  
  const service = new Service({
    coach: coach._id,
    title,
    description,
    duration,
    price
  });

  await service.save();
  coach.services.push(service._id);
  await coach.save();
  res.status(201).json(service);
});

// Update a service for a coach
exports.updateService = asyncHandler(async (req, res) => {
  const { title, description, duration, price } = req.body;
  const serviceId = req.params.serviceId;
  
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({ msg: 'Invalid service ID' });
  }
  
  const service = await Service.findById(serviceId);

  const coach = await Coach.findById(service.coach);

  // Check if the authenticated user is the coach who created the service or an admin
  if (req.user.id !== coach.user.toString() && req.user.type !== 'Admin') {
    return res.status(403).json({ msg: 'Not authorized to update this service' });
  }

  service.title = title;
  service.description = description;
  service.duration = duration;
  service.price = price;
  await service.save();
  res.json(service);
});

// Get a service for a coach
exports.getService = asyncHandler(async (req, res) => {
  const serviceId = req.params.serviceId;
  
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    return res.status(400).json({ msg: 'Invalid service ID' });
  }
  
  const service = await Service.findById(serviceId);

  // Check if the service exists
  if (!service) {
    return res.status(404).json({ msg: 'Service not found' });
  }

  res.json(service);
});

// Get all services for a coach
exports.getServicesByCoach = asyncHandler(async (req, res) => {
  const coachId = req.params.coachId;

  // Check if the coach exists
  const coach = await Coach.findById(coachId);
  if (!coach) {
    return res.status(404).json({ msg: 'Coach not found' });
  }

  // Fetch all services for the coach
  const services = await Service.find({ coach: coachId });

  res.json(services);
});


// Delete a service for a coach
exports.deleteService = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.serviceId)) {
      return res.status(400).json({ msg: 'Invalid service ID' });
  }
  const service = await Service.findById(req.params.serviceId);

  // Check if the service exists
  if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
  }

  const coach = await Coach.findById(service.coach);

  // Check if the authenticated user is the coach who created the service or an admin
  if (req.user.id !== coach.user.toString() && req.user.type !== 'Admin') {
    return res.status(403).json({ msg: 'Not authorized to delete this service' });
  }

  await Service.findByIdAndDelete(req.params.serviceId);
  coach.services.pull(service._id);
  await coach.save();
  res.status(204).json({ msg: 'Service deleted' });
});
