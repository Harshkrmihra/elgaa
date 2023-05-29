const { validationResult } = require('express-validator');
const Order = require('../models/Order');
const Service = require('../models/Service');
const User = require('../models/User');
const Message = require('../models/Message');
const asyncHandler = require('../middlewares/asyncHandler');

// Function to calculate the commission
async function calculateCommission(order) {
  const populatedOrder = await Order.findById(order._id).populate('service').exec();

  if (!populatedOrder.service || !populatedOrder.service.price) {
    throw new Error('Invalid order structure. Missing service or price property.');
  }

  const commissionPercentage = 10;
  const commission = populatedOrder.service.price * (commissionPercentage / 100);
  return commission;
}

// POST /orders
exports.createOrder = asyncHandler(async (req, res) => {
  const { service: serviceId, customer: customerId, coach: coachId } = req.body;

  try {
    const service = await Service.findById(serviceId).select('price');

    if (!service) {
      return res.status(400).json({
        success: false,
        error: 'Service not found',
      });
    }

    // Calculate commission
    const commissionPercentage = 10;
    const commission = service.price * (commissionPercentage / 100);

    // Create the order
  const order = new Order({
  service: serviceId,
  customer: customerId,
  coach: coachId,
  commission: commission,
  price: service.price,
  affiliateCode: req.header('X-Affiliate-Code'),
});

await order.save();

// Create a new chat between the coach and the customer
const message = new Message({
  content: 'New chat created',
  sender: coachId,
  receiver: customerId,
  orderId: order._id,
});

await message.save();


    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create order',
    });
  }
});

// GET /orders
exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    data: orders,
  });
});

// GET /orders/:id
exports.getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: order,
  });
});

// PUT /orders/:id
exports.updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: order,
  });
});

// DELETE /orders/:id
exports.deleteOrder = asyncHandler(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
