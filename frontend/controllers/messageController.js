const Message = require('../models/Message');
const Order = require('../models/Order');
const { body, validationResult } = require('express-validator');
let io;

// Set io object
exports.setIo = (socketIo) => {
  io = socketIo;
};

exports.validateMessageData = [
  // Validation rules
];

// Send a message
exports.sendMessage = async (req, res, next) => {
  const { content, sender, receiver, orderId } = req.body;

  // Find the order
  const order = await Order.findById(orderId);

  // Make sure the sender is the coach or the customer
  if (
    sender.toString() !== order.coach.toString() &&
    sender.toString() !== order.customer.toString()
  ) {
    return res.status(403).json({
      success: false,
      error: 'Unauthorized to send this message',
    });
  }

  try {
    const message = new Message({
      content,
      sender,
      receiver,
      orderId,
    });

    await message.save();

    // Emit the sendMessage event to the users involved in the conversation
    io.to(orderId).emit('sendMessage', message);

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error('Error while sending message:', error);
    res.status(500).json({
      success: false,
      error: 'Message could not be sent',
    });
  }
};

// Get all messages for a specific conversation
exports.getMessages = async (req, res) => {
  const { orderId } = req.params;

  try {
    const messages = await Message.find({
      orderId
    }).sort('timestamp');

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('Error while retrieving messages:', error);
    res.status(500).json({
      success: false,
      error: 'Messages could not be retrieved',
    });
  }
};

// Delete all messages for a specific order
exports.deleteMessagesByOrderId = async (req, res, next) => {
  try {
    await Message.deleteMany({ orderId: req.params.orderId });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error while deleting messages:', error);
    res.status(500).json({
      success: false,
      error: 'Messages could not be deleted',
    });
  }
};

// Delete a specific message by ID
exports.deleteMessageById = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (!message) {
      return res.status(404).json({
        success: false,
        error: `No message found with the id of ${req.params.messageId}`,
      });
    }
    await message.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error while deleting message:', error);
    res.status(500).json({
      success: false,
      error: 'Message could not be deleted',
    });
  }
};
