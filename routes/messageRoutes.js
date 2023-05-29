const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Send a message
router.post('/:orderId', messageController.validateMessageData, messageController.sendMessage);

// Get messages for a specific conversation
router.get('/:orderId', messageController.getMessages);

// Delete all messages for a specific order
router.delete('/:orderId', messageController.deleteMessagesByOrderId);

// Delete a specific message by ID
router.delete('/message/:messageId', messageController.deleteMessageById);

module.exports = router;
